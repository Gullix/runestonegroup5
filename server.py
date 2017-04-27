#!/usr/bin/env python
# https://daanlenaerts.com/blog/2015/06/03/create-a-simple-http-server-with-python-3/
# http://blog.kevindoran.co/bluetooth-programming-with-python-3/
from http.server import BaseHTTPRequestHandler, HTTPServer
import _thread
import time
from bluetooth import *
import socket
import bluetooth

 
# HTTPRequestHandler class
class testHTTPServer_RequestHandler(BaseHTTPRequestHandler):
 
  # GET
  def do_GET(self):
        # Send response status code
        self.send_response(200)
 
        # Send headers
        self.send_header('Content-type','text/html')
        self.end_headers()
 
        # Send message back to client
        message = "Welcome to the Warehouse server!"
        # Write content as utf-8 data
        self.wfile.write(bytes(message, "utf8"))
        return
 
 #simplified function for http hosting
def runHttp( threadName):
  print('starting server...')
 
  # Server settings
  # Choose port 8080, for port 80, which is normally used for a http server, you need root access
  server_address = ('127.0.0.1', 8081)
  httpd = HTTPServer(server_address, testHTTPServer_RequestHandler)
  print('running server...')
  httpd.serve_forever()

#simplified function for bluetooth connection
def btConnect(threadName, port):
  hostMACAddress = '74-DF-BF-4A-17-62' #Mac adress of bluetooth host
  port = 3
  backlog = 1
  size = 1024
  s = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
  s.bind((hostMACAddress, port))
  s.listen(backlog)
  try:
    client, clientInfo = s.accept()
    while 1:
      data = client.recv(size)
      if data:
        print(data)
        client.send(data) # Echo back to client
  except: 
    print("Closing socket")
    client.close()
    s.close()

btConnect("", 1)
#Here we start the threads.
'''
try:
   _thread.start_new_thread( btConnect, ("Thread-1", 1, ) )
except:
   print ("Error: unable to start thread")

while 1:
   pass'''
 
