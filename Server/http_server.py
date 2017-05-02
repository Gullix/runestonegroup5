#!/usr/bin/env python3

import http.server
import os

PORT = 8000


def make_request_handler(data):
    class RequestHandler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super(RequestHandler, self).__init__(*args, **kwargs)

            self.data = data


        def do_POST(self):
            """Respond to a POST request."""
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(bytes(data["test"], 'utf-8'))

    return RequestHandler


def run_server(data):

    # change to Web directory so we can use SimpleHTTP to serve the files
    WEB_DIR = os.path.join(os.path.dirname(__file__), "../Web")
    os.chdir(WEB_DIR)

    httpd = http.server.HTTPServer(("", PORT), make_request_handler(data))
    httpd.serve_forever()


if __name__ == "__main__":
    import shared_data
    run_server(shared_data.new_shared_dict())