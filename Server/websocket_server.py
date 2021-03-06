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

		if typ == "manual_on" and not data["robot"]["is_manual"]:
			if len(data["robot"]["command_queue"]) == 0:
				data["robot"]["command_queue"].append("MANUAL")
			elif data["robot"]["command_queue"][0] != "MANUAL":
				data["robot"]["command_queue"].insert(0, "MANUAL")
			data["robot"]["is_manual"] = True
			print("enter manual mode")
			while True:
				message = await websock.recv()
				typ, message_data = jh.j_unpack(message)

				if typ == "hello":
					await websock.send(jh.j_pack("all", data))
				elif typ == "manual_off":
					data["robot"]["manual_command"] = "MANUAL_END"
					data["robot"]["is_manual"] = False
					print("exit manual mode")
					break
				elif typ == "manual_command":
					# Recieved is one of 4 chars: F, B, L, R, X
					data["robot"]["manual_command"] = message_data
					print(data["robot"]["manual_command"])
			continue
				

		process(data, typ, message_data)


def process(data, typ, message):
	if typ == "new_package":
		rc.command_new_package(data, message)
	elif typ == "moveTo":
		rc.command_move_to_location(data, message)
	elif typ == "victory":
		rc.command_victory(data)
	elif typ == "move_package":
		rc.command_move_package(data, message["package_id"], message["to_location"])
	elif typ == "extract_package":
	    rc.command_remove_package(data,message["package_id"],message["to_location"])
		


def run_server(data):

	asyncio.set_event_loop(asyncio.new_event_loop())

	start_server = websockets.serve(lambda sock, path: interact(sock, path, data), 'localhost', 8001)

	asyncio.get_event_loop().run_until_complete(start_server)
	asyncio.get_event_loop().run_forever()


if __name__ == "__main__":
	import shared_data
	run_server(shared_data.new_shared_dict())
