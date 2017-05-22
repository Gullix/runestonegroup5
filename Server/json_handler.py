#!/usr/bin/env python3
import json

TEST_JSON = {
	"map": json.dumps({
		"type_of_data": "map",
		"data": {
			"rows" : [
				["b","b","z","b","z","b","z","b","b"],
				["b","b","l","b","l","b","l","b","b"],
				["s","l","i","l","i","l","i","l","e"],
				["b","b","l","b","l","b","l","b","b"],
				["b","b","z","b","z","b","z","b","b"]
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
	"package_list": json.dumps({
		"type_of_data": "package_list",
		"data": [
			"pack1",
			"pack2",
			"pack3"
		]
	}),
	"robot": json.dumps({
		"type_of_data": "robot",
		"data": {
			"position": {"row": 2, "col": 0},
			"orientation": "east"
		}
	})
}

def get_test_json(type_of_data):
		return TEST_JSON[type_of_data]

def j_pack(type_of_data, data):
	return json.dumps({
		"type_of_data": type_of_data,
		"data": data
	})

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



