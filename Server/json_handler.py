#!/usr/bin/env python3
import simplejson as json

def make_to_json_list(type_of_data):
	#read from file and make the list 
	pl =['pack1','pack2', 'pack3']
	json_string = json.dumps({'type_of_data' : type_of_data,'args': pl})
	return json_string
