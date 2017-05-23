#!/usr/bin/env python3
import json

TEST_JSON_SEND = {
	"map": {
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
	},
	"package_list": {
		"type_of_data": "package_list",
		"data": [
			{ "package_id":"pack1", "position": {"row": 0, "column": 2}},
			{ "package_id":"pack2", "position": {"row": 0, "column": 4}},
			{ "package_id":"pack3", "position": {"row": 4, "column": 4}}
			
		]
	},
	"storage_zone_list": {
		"type_of_data": "storage_zone_list",
		"data": [
			{ "storage_zone_id":"storage1", "position": {"row": 0, "column": 2}},
			{ "storage_zone_id":"storage2", "position": {"row": 0, "column": 4}},
			{ "storage_zone_id":"storage3", "position": {"row": 0, "column": 6}},
			{ "storage_zone_id":"storage4", "position": {"row": 4, "column": 2}},
			{ "storage_zone_id":"storage5", "position": {"row": 4, "column": 4}},
			{ "storage_zone_id":"storage6", "position": {"row": 4, "column": 6}}
			
		]
	},
	"start_zone_list": {
		"type_of_data": "start_zone_list",
		"data": [
			{ "start_zone_id":"start1", "position": {"row": 2, "column": 0}},
			]
	},
	"end_zone_list": {
		"type_of_data": "end_zone_list",
		"data": [
			{ "end_zone_id":"start1", "position": {"row": 2, "column": 8}},
			]
	},
	"robot": {
		"type_of_data": "robot",
		"data": {
			"position": {"row": 2, "column": 0},
			"orientation": "east",
			"has_package": False
		}

	}
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
		"data": TEST_JSON_SEND
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



