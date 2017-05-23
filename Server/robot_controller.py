def get_target(data):

    dir = data["robot"]["direction"]
    robpos = data["robot"]["position"]
    data["robot"]["target"] = data["targets"].popleft()
    
def update_position(data, direction):
	if direction == "U":
		data["robot"]["position"][] =
	if direction == "D":

	if direction == "R":

	if direction == "L":
		



def calculate_dir(data)
	tarR, tarC = data["robot"]["target"]
	posR, posC = data["robot"]["position"]
	if (posR == tarR) && (tarC == tarC):
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