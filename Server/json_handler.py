#!/usr/bin/env python3
import json

TEST_JSON_SEND = {
	"map": json.dumps({
		"type_of_data": "map",
		"data": {
			"rows" : [
				["b","b","z1","b","z2","b","b"],
				["b","b","l" ,"b","l" ,"b","b"],
				["s","l","i1","l","i2","l","e"],
				["b","b","l" ,"b","l" ,"b","b"],
				["b","b","z3","b","z4","b","b"]
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
	}),
	"packages": json.dumps({
		"type_of_data": "package_list",
		"data": {
			"pack1": { "package_id":"pack1", "position": {"row": 0, "column": 2}},
			"pack2": { "package_id":"pack2", "position": {"row": 0, "column": 4}},
			"pack3": { "package_id":"pack3", "position": {"row": 4, "column": 4}}	
		}
	}),
	"robot": json.dumps({
		"type_of_data": "robot",
		"data": {
			"position": {"row": 2, "column": 0},
			"orientation": "east",
			"has_package": False
		}

	})
}

TEST_JSON_RECV = {
	"task_list": json.dumps({
		"type_of_data": "task_list",
		"data": [
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
	}),
	"new_package": json.dumps({
		"type_of_data": "new_package",
		"data": {
			"packageID": "package83",
			"position": {"row": 2, "column": 0}
		}
	}),
}

def get_test_json(type_of_data):
		if type_of_data in TEST_JSON_SEND:
			return TEST_JSON_SEND[type_of_data]
		elif type_of_data in TEST_JSON_RECV:
			return TEST_JSON_RECV[type_of_data]
		else:
			raise ValueError()

def j_pack(type_of_data, data):
	return json.dumps({
		"type_of_data": type_of_data,
		"data": data
	})

def j_unpack(json_str):
	packet = json.loads(json_str)
	return packet["type_of_data"], packet["data"]

class Task(object):
	action = ""
	args = []
	task_id = 0

	# The class "constructor" - It's actually an initializer 
	def __init__(self, action, args, task_id):
		self.name = action
		self.args = args
		self.task_id = task_id

def make_task(action, args, task_id):
	task = Task(action, args, task_id)
	return task



