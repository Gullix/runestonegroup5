import random


PICK = "PICK"
DROP = "DROP"
U = "U"
D = "D"
L = "L"
R = "R"
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

########################################
# COMMAND IMPLEMENTATIONS
########################################

def command_remove_package(data, package_id,location_dropoff):
	command_move_package(data, package_id, location_dropoff)
	data["package"][package_id]["remove_after_drop"] += [True]
	
    



def remove_package(data,package_id):
	# Remove package, since it is now out of the warehouse
	    
	if data["packages"].get(package_id,None):
		del data["packages"][package_id]
	else:
		raise CommandError("Package does not exist")



def command_new_storage_location(data, location_pickup, location_dropoff):

	#location_pickup = pos_to_zone(pos_pickup)
	#location_dropoff = pos_to_zone(pos_dropoff)

	commands = []

	commands += calculate_path(data, data["robot"]["final_location"], location_pickup)


	commands += [PICK]
	commands += calculate_path(data, location_pickup, location_dropoff)


	commands += [DROP]

	data["robot"]["final_location"] = location_dropoff
	data["robot"]["command_queue"] += commands



def command_move_to_location(data, location_target):
	commands = []

	commands += calculate_path(data, data["robot"]["final_location"], location_target)


	data["robot"]["final_location"] = location_target
	data["robot"]["command_queue"] += commands


	

def command_new_package(data, package):

	# Create new package
	package_already_exists = package["packageID"] in [p["packageID"] for p in data["packages"]]
	valid_pos = pos_valid(data, package["position"])

	if not valid_pos or package_already_exists:
		raise CommandError("Invalid, package already exists or position is invalid")

	data["map"]["packages"][package["packageID"]] = package

	# Make commands
	commands = []

	commands += calculate_path(data, data["robot"]["final_location"], START)


	commands += [PICK]
	final_location = allocate_new_zone(data)
	commands += calculate_path(data, START, final_location)


	commands += [DROP]

	data["robot"]["final_location"] = final_location
	data["robot"]["command_queue"] += commands

def command_victory(data):

	data["robot"]["command_queue"] += ["VICTORY"]

def command_move_package(data, package_id, location_dropoff):
	location_pickup =pos_to_zone(data,data["packages"][package_id]["position"])
	command_new_storage_location(data,location_pickup,location_dropoff)



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
		if zone.startswith("zone") and
		   zone not in [package["location"] for package in data["packages"].values()]
	]

	return random.choice(available_zones)


def pos(position):
	return position["row"], position["column"]


def pos_to_zone(data, pos):
	return data["map"]["rows"][pos["row"]][pos["column"]]


def zone_to_pos(data, zone):
	i = 0
	
	for r in data["map"]["rows"]:
		j = 0
		for c in r:

			if data["map"]["rows"][i][j] == zone:
				return {"row": i, "column": j}
			j= j +1 
				
		i = i +1

def pos_valid(data, position):
	r,c = pos(position)
	square = data["map"]["rows"][r][c]

	if square == "b" or square not in data["map"]["square_types"]:
		return False
	return True
def carrying_package(data,robot_pos):
	for package in data["packages"]:
		if (data["packages"][package]["position"]["row"] == robot_pos["row"] and data["packages"][package]["position"]["column"] == robot_pos["column"]):
			data["packages"][package]["in_transit"] = True
			return package
	return None

def package_here(data,position):
	if( 1  and 2 and 3)
	for package in data["packages"]:
		if (data["packages"][package]["position"]["row"] == position["row"] and (data["packages"][package]["position"]["column"] == position["column"] and !data["packages"][package]["in_transit"])):			
			return True
	return False
def package_being_dropped(data,package, position):
	if (len(data["packages"][package]["remove_after_drop"]) > 0 and  data["packages"][package]["remove_after_drop"].pop(0)):
		remove_package(data,package)
	else :
		data["packages"][package]["in_transit"] = False
		data["packages"][package]["position"]["row"] = position["row"]
		data["packages"][package]["position"]["column"] = position["column"]
    

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
	

