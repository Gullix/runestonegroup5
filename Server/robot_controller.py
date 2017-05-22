def get_target(data, robot_sock):

    dir = data["robot"]["direction"]
    command = input("Give me something\n")
    #target = "M," + dir + ",10"
    #robot_sock.send(bytes(target, "utf-8"))
    robot_sock.send(bytes(command, "utf-8"))