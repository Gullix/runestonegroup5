#!/usr/bin/env python3

import socket
import robot_controller

MAC_ADDRESS = "00:0C:78:76:64:DB"
PORT = 1

ACTIONS = {
    "GET_COMMAND": robot_controller.get_target
}

def validate(message):
    """
    :return: Whether message is valid.
    If valid is True, then action is a function that takes
    the application state (data) and a socket (robot_sock)
    """
    parts = message.replace(" ", "").split(",")

    if len(parts) < 1:
        return None, False

    if parts[0] not in ACTIONS:
        return None, False

    return parts[0], True


def run_server(data):

    """
    Start Bluetooth server.
    :param data: Application state. A dictionary shared by both servers.
    """

    print("Blue: Starting server...")
    server_sock = socket.socket(socket.AF_BLUETOOTH, socket.SOCK_STREAM, socket.BTPROTO_RFCOMM)
    server_sock.bind((MAC_ADDRESS, PORT))
    server_sock.listen()

    while not data["close_requested"]:

        try:

            print("Blue: Waiting for robot to connect...")
            robot_sock, address = server_sock.accept()
            print("Blue: Connected to Robot!")

            while True:
                print("Blue: Robot is busy...")
                message = robot_sock.recv(1024)

                action, valid = validate(str(message, "utf-8"))
                print("Blue: Recieved: ", str(message))
                if valid:
                    # Run the corresponding function in robot_controller.py
                    ACTIONS[action](data, robot_sock)
                else:
                    print("Blue: Received invalid message, replying...")
                    robot_sock.send(bytes("INVALID", 'utf-8'))

        except OSError as ose:
            print("Blue: Failed to accept connection!")
            print(ose)




if __name__ == "__main__":
    import shared_data
    run_server(shared_data.new_shared_dict())