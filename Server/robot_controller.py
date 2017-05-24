class CommandError(Exception):
	pass

def pos(position):
	return position["row"], position["col"]

def pos_valid(data, position):
	r,c = pos(position)
	square = data["map"]["rows"][r][c]

	if square == "b" or square not in data["map"]["sqaure_types"]:
		return False

	return True

def get_target(data):

    dir = data["robot"]["direction"]
    robpos = data["robot"]["position"]
    data["robot"]["target"] = data["targets"].popleft()
    
def update_position(data, direction):
	if direction == "U":
		data["robot"]["position"]["row"] -= 1
	if direction == "D":
		data["robot"]["position"]["row"] += 1
	if direction == "R":
		data["robot"]["position"]["col"] += 1
	if direction == "L":
		data["robot"]["position"]["col"] -= 1

def update_package(data, direction, packageID)
	if direction == "U":
		data["packages"][packageID]["position"]["row"] -= 1
	if direction == "D":
		data["packages"][packageID]["position"]["row"] += 1
	if direction == "R":
		data["packages"][packageID]["position"]["col"] += 1
	if direction == "L":
		data["packages"][packageID]["position"]["col"] -= 1	


def calculate_dir(data):
	tarR, tarC = data["robot"]["target"]
	posR, posC = data["robot"]["position"]
	if (posR == tarR) and (tarC == tarC):
		return "S"
	if posR == 2:
		if posC == tarC:
			if posR < tarR:
				return "U"
			if posR > tarR:
				return "D"
		if posC < tarC:
			return "R"
		if posC > tarC:
			return "L"
	if posR < 2:
		return "D"
	if posR > 2:
		return "U"


def new_package(data, package):
	
	package_already_exists = package["packageID"] in [p["packageID"] for p in data["packages"]]
	valid_pos = pos_valid(data, package["position"])
	
	if not valid_pos or package_already_exists:
		raise CommandError("Invalid, package already exists or position is invalid")

	data["map"]["packages"].append(package)

