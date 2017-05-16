#!/usr/bin/env python3

import asyncio
import websockets

PORT = 8001

async def interact(websock, path, data):
    while True:
        message = await websock.recv()
        print("Http: Received: ", message)
        reply = "Hello {}!".format(message)
        await websock.send(reply)
        print("> {}".format(reply))
        if message.upper() in {"F", "B", "L", "R"}:
            print("Http: setting direction of robot to ", message)
            data["robot"]["direction"] = message

def run_server(data):

    asyncio.set_event_loop(asyncio.new_event_loop())

    start_server = websockets.serve(lambda sock, path: interact(sock, path, data), 'localhost', 8001)

    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()


if __name__ == "__main__":
    import shared_data
    run_server(shared_data.new_shared_dict())