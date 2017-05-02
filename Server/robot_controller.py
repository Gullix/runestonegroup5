def get_target(data, robot_sock):

    target = "M,R,10"
    data["robot"]["last_target"] = target

    robot_sock.send(bytes(target, "utf-8"))