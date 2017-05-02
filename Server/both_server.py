#!/usr/bin/env python3

import threading
import http_server
import bluetooth_server
import shared_data

def main():

    data = shared_data.new_shared_dict()

    http_thread = threading.Thread(target=lambda: http_server.run_server(data))
    bluetooth_thread = threading.Thread(target=lambda: bluetooth_server.run_server(data))

    http_thread.start()
    bluetooth_thread.start()


main()