
def new_shared_dict():
	return {
		"test": "TEST SUCCESSFUL",
		"close_requested": False,
		"robot": {
			"last_target": None,
			"direction": "F",
			"position": {"row": 2, "col": 0},
			"has_package": False
		},
		"packages": [
			{
				"packageID": "package1",
				"position": {"row": 0, "col": 4}
			}
		],
		"map": {
			"rows" : [
				["b","b","z","b","b"],
				["b","b","l","b","b"],
				["s","l","i","l","e"],
				["b","b","l","b","b"],
				["b","b","z","b","b"]
			],
			"square_types": {
				"b": "blank",
				"z": "zone",
				"s": "start",
				"e": "end",
				"l": "line",
				"i": "intersection"
			}
		}
	}
