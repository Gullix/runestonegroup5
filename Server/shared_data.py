
def new_shared_dict():
    return {
        "test": "TEST SUCCESSFUL",
        "close_requested": False,
        "robot": {
            "last_target": None,
            "direction": "F",
            "position": [0,0] #row column (think matrix)
        },
        "map": {
	        "rows" : [
                ["b","b","z","b","z","b","z","b","b"],
                ["b","b","l","b","l","b","l","b","b"],
                ["s","l","i","l","i","l","i","l","e"],
                ["b","b","l","b","l","b","l","b","b"],
                ["b","b","z","b","z","b","z","b","b"]
            ],
            "square_types": {
                "b": "blank"
                "z": "zone"
                "s": "start"
                "e": "end"
                "l": "line",
                "i": "intersection"
            }
        }
    }
