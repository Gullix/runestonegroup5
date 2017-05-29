import random


PICK = "PICK"
DROP = "DROP"
YES = "YES"
NO = "NO"
U = "U"
D = "D"
L = "L"
R = "R"
MANUAL = "MANUAL"
DIRECTIONS = [U, D, L, R]
COMMANDS = [PICK, DROP] + DIRECTIONS

START = "s"


########################################
# Robot interaction
########################################

def get_command(data, socket):
	"""
	Called when the robot requests a command from the command Queue
	"""
	update_robot_status(data, data["robot"]["last_command"])
	while len(data["robot"]["command_queue"]) == 0:
		pass
	command = data["robot"]["command_queue"].pop(0)
	data["robot"]["last_command"] = command
	socket.send(bytes(command, "UTF-8"))
	if command == MANUAL:
		manual_mode(data, socket)

def manual_mode(data, socket):
	while True:
		message = socket.recv(1024)
		
		command = data["robot"]["manual_command"]
		socket.send(bytes(command, 'utf-8'))

		if command == "MANUAL_END":
			break

########################################
# COMMAND IMPLEMENTATIONS
########################################

def command_remove_package(data, package_id,location_dropoff):
	command_move_package(data, package_id, location_dropoff)
	data["packages"][package_id]["remove_after_drop"] += [YES]
	
    



def remove_package(data,package_id):
	# Remove package, since it is now out of the warehouse
	    
	if data["packages"].get(package_id,None):
		del data["packages"][package_id]
	else:
		raise CommandError("Package does not exist")


def command_move_to_location(data, location_target):
	commands = []

	commands += calculate_path(data, data["robot"]["final_location"], location_target)


	data["robot"]["final_location"] = location_target
	data["robot"]["command_queue"] += commands


def command_new_package(data, new_package_specs):

	# Create new package

	pickup_zone = new_package_specs["from_location"]

	package_id = "package{}".format(random.randint(1,100))
	package_already_exists = package_id in data["packages"].keys()
	while package_already_exists:
		package_id = "package{}".format(random.randint(1,100))
		package_already_exists = package_id in [p["package_id"] for p in data["packages"]]

	data["packages"][package_id] = {
		"package_id": package_id,
		"position": zone_to_pos(data, pickup_zone),
		"remove_after_drop": [],
		"in_transit": False
	}

	print(data["packages"])

	dropoff_zone = allocate_new_zone(data)

	command_move_package(data, package_id, dropoff_zone)


def command_victory(data):
	data["robot"]["command_queue"] += ["VICTORY"]


def command_move_package(data, package_id, location_dropoff):

	location_pickup = pos_to_zone(data,data["packages"][package_id]["position"])

	commands = []

	commands += calculate_path(data, data["robot"]["final_location"], location_pickup)


	commands += [PICK]
	commands += calculate_path(data, location_pickup, location_dropoff)

	commands += [DROP]

	data["robot"]["final_location"] = location_dropoff
	data["robot"]["command_queue"] += commands
	data["packages"][package_id]["remove_after_drop"].append(NO)


########################################
# PATHFINDING
########################################

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

def adjs(graph, node):
	return [graph[node][x] for x in DIRECTIONS if x in graph[node]]

########################################
# MISC
########################################

class CommandError(Exception):
	pass


def allocate_new_zone(data):
	
	available_zones = [
		zone for zone in data["map"]["graph"].keys()
		if zone.startswith("z") and
		   zone not in [pos_to_zone(data, package["position"]) for package in data["packages"].values()]
	]

	return random.choice(available_zones)


def pos(position):
	return position["row"], position["column"]


def pos_to_zone(data, pos):
	return data["map"]["rows"][pos["row"]][pos["column"]]


def zone_to_pos(data, zone):
	for i in range(len(data["map"]["rows"])):
		for j in range(len(data["map"]["rows"][i])):
			if data["map"]["rows"][i][j] == zone:
				return {"row": i, "column": j}
	print("EROROROROOR didnt find zone")
	print(zone)
	print("EROROROROOR didnt find zone")



def carrying_package(data,robot_pos):
	for package in data["packages"]:
		if (data["packages"][package]["position"]["row"] == robot_pos["row"] and data["packages"][package]["position"]["column"] == robot_pos["column"]):
			data["packages"][package]["in_transit"] = True
			return package
	return None


def package_here(data,position):
	for package in data["packages"]:
		if (data["packages"][package]["position"]["row"] == position["row"] and data["packages"][package]["position"]["column"] == position["column"] and (data["packages"][package]["in_transit"] == False)):			
			return True
	return False


def package_being_dropped(data,package_id, position):
	print(data["packages"][package_id])
	print(len(data["packages"][package_id]["remove_after_drop"]))
	if (len(data["packages"][package_id]["remove_after_drop"]) > 0 and data["packages"][package_id]["remove_after_drop"].pop(0) == YES):
		remove_package(data,package_id)
	else :
		data["packages"][package_id]["in_transit"] = False
		data["packages"][package_id]["position"]["row"] = position["row"]
		data["packages"][package_id]["position"]["column"] = position["column"]
    

def update_robot_status(data,command):
	if (command == U):
		data["robot"]["position"]["row"] -= 2
	elif (command == D):
		data["robot"]["position"]["row"] += 2
	elif (command == L):
		data["robot"]["position"]["column"] -= 2
	elif (command == R):
		data["robot"]["position"]["column"] += 2
	elif (command == PICK):
		data["robot"]["carrying_package"] = carrying_package(data,data["robot"]["position"])
	elif (command == DROP):
		package_being_dropped(data,data["robot"]["carrying_package"],data["robot"]["position"])
		data["robot"]["carrying_package"] = None
	

