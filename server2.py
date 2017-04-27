#!/usr/bin/env python
# https://daanlenaerts.com/blog/2015/06/03/create-a-simple-http-server-with-python-3/
# http://blog.kevindoran.co/bluetooth-programming-with-python-3/
# https://github.com/karulis/pybluez/blob/master/examples/simple/rfcomm-server.py
#from http.server import BaseHTTPRequestHandler, HTTPServer


import _thread
import time
import bluetooth
from bluetooth import *


#simplified function for bluetooth connection
def btConnect(threadName, port):
  '''
  nearby_devices = bluetooth.discover_devices(lookup_names=True)
  print("found %d devices" % len(nearby_devices))

  for addr, name in nearby_devices:
    print("  %s - %s" % (addr, name))
    '''
  server_sock=BluetoothSocket( RFCOMM )
  server_sock.bind(("",PORT_ANY))
  server_sock.listen(1)

  port = server_sock.getsockname()[1]

  uuid = "94f39d29-7d6d-437d-973b-fba39e49d4ee"
  advertise_service( server_sock, "SampleServer",
                   service_id = uuid,
                   service_classes = [ uuid, SERIAL_PORT_CLASS ],
                   profiles = [ SERIAL_PORT_PROFILE ], 
#                   protocols = [ OBEX_UUID ] 
                    )
                    
  print("Waiting for connection on RFCOMM channel %d" % port)

  client_sock, client_info = server_sock.accept()
  print("Accepted connection from ", client_info)

  try:
    while True:
      data = client_sock.recv(1024)
      if len(data) == 0: break
      print("received [%s]" % data)
  except IOError:
    pass

  print("disconnected")

  client_sock.close()
  server_sock.close()
  print("all done")
btConnect("",2)
#Here we start the threads.
'''
try:
   _thread.start_new_thread( btConnect, ("Thread-1", 1, ) )
except:
   print ("Error: unable to start thread")

while 1:
   pass'''
 
