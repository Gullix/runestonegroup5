
def new_shared_dict():
    return {
        "test": "TEST SUCCESSFUL",
        "close_requested": False,
        "robot": {
            "last_target": None,
            "direction": "F",
            "position": [0,0] #row column (think matrix)
            }
        "map":{
           "rows" : [
            {["","","z","","z","","z","",""],
             ["","","z","","z","","z","",""]

            }
           ]

         "square_types"{
         "": "blank"
         "z":  "zone"
         "s":   "start"
         "e":  "end"
         "l":  "line"

         }
        }

     }