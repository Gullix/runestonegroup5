
def new_shared_dict():
	return {
		"test": "TEST SUCCESSFUL",
		"close_requested": False,
		"robot": {
			"last_target": None,
			"direction": "F",
			"position": {"row": 2, "column": 0},
			"has_package": False,
			"command_queue": [],
			"final_location": "s"
		},
		"packages": {
			"package1": {
				"packageID": "package1",
				"position": {"row": 0, "column": 4}
			}
		},
		"map": {
			"graph": {
				"s": {
					"R": "i1",
				},
				"i1": {
					"U": "z1",
					"R": "i2",
					"D": "z3",
					"L": "s"
				},
				"i2": {
					"U": "z2",
					"R": "e",
					"D": "z4",
					"L": "i1"
				},
				"z1": {
					"D": "i1"
				},
				"z2": {
					"D": "i2"
				},
				"z3": {
					"U": "i1"
				},
				"z4": {
					"U": "i2"
				},
				"e": {
					"L": "i2"
				}
			},
			"rows": [
				["b","b","z1","b","z2","b","b"],
				["b","b","l" ,"b","l" ,"b","b"],
				["s","l","i1","l","i2","l","e"],
				["b","b","l" ,"b","l" ,"b","b"],
				["b","b","z3","b","z4","b","b"]
			]
		}
	}
