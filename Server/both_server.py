#!/usr/bin/env python3

import threading
import websocket_server
import bluetooth_server
import shared_data

def main():

    data = shared_data.new_shared_dict()

    websocket_thread = threading.Thread(target=lambda: websocket_server.run_server(data))
    bluetooth_thread = threading.Thread(target=lambda: bluetooth_server.run_server(data))

    websocket_thread.start()
    bluetooth_thread.start()


main()