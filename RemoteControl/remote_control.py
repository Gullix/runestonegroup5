#!/usr/bin/env python

"""
Remote Control Demo!
"""

import time
import bluetooth
import sys
from bluetooth import *


commands = {"forw", "back", "left", "right", "done"}


def run_remote_control():
	'''
	Connect to robot, and send commands back and forth.
	'''
	print "Waiting for Robot to connect..."
	server_sock=bluetooth.BluetoothSocket( bluetooth.RFCOMM )
	server_sock.bind(("",1))
	server_sock.listen(1)

	client_sock, client_info = server_sock.accept()
	print "Accepted connection from ", client_info
	time.sleep(1)
	print "Valid commands are:", ", ".join(commands)

	try:
		while True:
			sys.stdout.write(">>> ")
			command = sys.stdin.readline().strip()
			while command not in commands:
				print "Valid commands are:", ", ".join(commands)
				sys.stdout.write(">>> ")
				command = sys.stdin.readline().strip()
			print "sending '{}'".format(command)
			client_sock.send(command)
			if command != "done":
				print "waiting for ack..."
				ack = client_sock.recv(1024)
				print "<<<", ack
			else:
				break
	except BluetoothError:
		print "BluetoothError"
	except IOError:
		print "IOError"

	time.sleep(1)
	client_sock.close()
	server_sock.close()
	print "Finished!"

run_remote_control()
 
