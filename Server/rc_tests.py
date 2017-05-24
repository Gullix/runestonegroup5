import robot_controller as rc

data = {
    "robot": {
            "position": "start",
			"command_queue": []
    },
	"map": {
		"graph": {
			"start": {
				"R": "intersection1",
			},
			"intersection1": {
				"U": "zone1",
				"R": "intersection2",
				"D": "zone3",
				"L": "start"
			},
			"intersection2": {
				"U": "zone2",
				"R": "end",
				"D": "zone4",
				"L": "intersection1"
			},
			"zone1": {
				"D": "intersection1"
			},
			"zone2": {
				"D": "intersection2"
			},
			"zone3": {
				"U": "intersection1"
			},
			"zone4": {
				"U": "intersection2"
			},
			"end": {
				"L": "intersection2"
			}
		}
	}
}

#print(rc.calculate_path(data, "zone3"))

rc.pickup_new_package(data)

print(data["robot"]["command_queue"])
