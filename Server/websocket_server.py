#!/usr/bin/env python3

import asyncio
import websockets
import json_handler as jh
import robot_controller as rc


PORT = 8001

async def interact(websock, path, data):
	while True:
		message = await websock.recv()
		
		typ, message_data = jh.j_unpack(message)

		if typ == "hello":
			await websock.send(jh.j_pack("all", data))
			continue

		process(data, typ, message_data)


def process(data, typ, message):
	if typ == "new_package":
		rc.new_package(data, message)
	elif typ == "moveTo":
		rc.command_move_to_location(data, message)
	elif typ == "new_storage_location":
	    rc.command_move_package(data,message["from_location"],message["to_location"])
	elif typ == "victory":
		rc.command_victory(data)
		

def run_server(data):

	asyncio.set_event_loop(asyncio.new_event_loop())

	start_server = websockets.serve(lambda sock, path: interact(sock, path, data), 'localhost', 8001)

	asyncio.get_event_loop().run_until_complete(start_server)
	asyncio.get_event_loop().run_forever()


if __name__ == "__main__":
	import shared_data
	run_server(shared_data.new_shared_dict())
