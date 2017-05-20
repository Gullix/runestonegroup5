#!/usr/bin/env python3
import simplejson as json

def make_to_json_list(type_of_data):
	#read from file and make the list 
	if type_of_data == 'pl':
		pl =['pack1','pack2', 'pack3']
		json_string = json.dumps({'type_of_data' : type_of_data,'args': pl})
	elif type_of_data == 'tl':
	    tl  = [make_task("pickup",["package3"],1),make_task("deliver",["area3"],2)]
	    json_string = json.dumps({
	    	'type_of_data' : type_of_data,'tl':
	    	[
	    	    {'action': "move",
                'args':  ["package1412"],
                'task_id': 2 },
                {'action': "move",
                'args':  ["package1234"],
                'task_id': 3 }

                ]
	    	})



	return json_string

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