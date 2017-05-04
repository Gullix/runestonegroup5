
def new_shared_dict():
    return {
        "test": "TEST SUCCESSFUL",
        "close_requested": False,
        "robot": {
            "last_target": None,
            "direction": "F"
        }
    }