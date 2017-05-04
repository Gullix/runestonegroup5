def get_target(data, robot_sock):

    dir = data["robot"]["direction"]
    target = "M," + dir + ",10"

    robot_sock.send(bytes(target, "utf-8"))