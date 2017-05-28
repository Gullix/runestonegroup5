
def new_shared_dict():
	return {
		"test": "TEST SUCCESSFUL",
		"close_requested": False,
		"robot": {
			"last_target": None,
			"direction": "F",
			"position": {"row": 2, "column": 0},
			"carrying_package": None,
			"command_queue": [],
			"state_queue": [],
			"final_location": "s",
			"last_command": None
			
		},
		"packages": {
			"package1": {
				"package_id": "package1",
				"position": {"row": 0, "column": 4,
				"in_transit": False }
			},
			"package2": {
				"package_id": "package2",
				"position": {"row": 0, "column": 2,
				"in_transit": False}
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
		},
		"tasks": [
			{
				'action': "move",
				'args':  ["package1412"],
				'task_id': 2
			},
			{
				'action': "move",
				'args':  ["package1234"],
				'task_id': 3
			}
			]	
	}
