import random


PICK = "PICK"
DROP = "DROP"
U = "U"
D = "D"
L = "L"
R = "R"
DIRECTIONS = [U, D, L, R]
COMMANDS = [PICK, DROP] + DIRECTIONS


class CommandError(Exception):
	pass


def pos(position):
	return position["row"], position["col"]


def pos_to_zone(data, pos):
	return data["map"]["rows"][pos["row"]][pos["col"]]


def zone_to_pos(data, zone):
	for r in data["map"]["rows"]:
		for c in r:
			if data["map"]["rows"][r][c] == zone:
				return {"row": r, "col": c}


def pos_valid(data, position):
	r,c = pos(position)
	square = data["map"]["rows"][r][c]

	if square == "b" or square not in data["map"]["sqaure_types"]:
		return False

	return True

def get_command(data, socket):
	command = data["robot"]["command_queue"].popleft()
	socket.write(command)


def allocate_new_zone(data):
	return random.choice([zone for zone in data["map"]["graph"].keys() if zone.startswith("zone")])


def pickup_new_package(data):

	commands = []
	commands += calculate_path(data, data["robot"]["position"], "start")
	commands += [PICK]
	commands += calculate_path(data, "start", allocate_new_zone(data))
	commands += [DROP]

	data["robot"]["command_queue"] += commands


def adjs(graph, node):
	return [graph[node][x] for x in DIRECTIONS if x in graph[node]]


def calculate_path(data, start, target):

	graph = data["map"]["graph"]

	parent_tree = bfs_tree(graph, start)

	path = []
	node = target
	while parent_tree[node] != None:
		path.append([k for k,v in graph[parent_tree[node]].items() if v == node][0])
		node = parent_tree[node]

	return list(reversed(path))


def bfs_tree(graph, start_node):

    visited = set()
    candidates = [(start_node, None)]
    parents = {}
    while len(candidates) > 0:
        node, parent = candidates.pop(0)
        if node not in visited:
            parents[node] = parent
        visited.add(node)

        for adj in adjs(graph, node):

            if adj not in visited:
                candidates.append((adj, node))

    return parents


def new_package(data, package):

	package_already_exists = package["packageID"] in [p["packageID"] for p in data["packages"]]
	valid_pos = pos_valid(data, package["position"])

	if not valid_pos or package_already_exists:
		raise CommandError("Invalid, package already exists or position is invalid")

	data["map"]["packages"].append(package)

