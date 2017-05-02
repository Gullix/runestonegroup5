"""
A simple Python script to receive messages from a client over
Bluetooth using Python sockets (with Python 3.3 or above).
"""

import socket

hostMACAddress = '00:0C:78:76:64:DB' # The MAC address of a Bluetooth adapter on the server. The server might have multiple Bluetooth adapters.
port = 1 # 3 is an arbitrary choice. However, it must match the port used by the client.
backlog = 1
size = 1024
s = socket.socket(socket.AF_BLUETOOTH, socket.SOCK_STREAM, socket.BTPROTO_RFCOMM)
s.bind((hostMACAddress,port))
print("listening")
s.listen(backlog)
try:
	client, address = s.accept()
	while True:
		client.send(bytes(input().strip(), 'UTF-8'))
except OSError as e:
	print(e)

print("Closing socket")	
client.close()
s.close()
