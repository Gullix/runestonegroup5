var wSocket;
$(function(){
    openWebSocket();
     remoteButtonsClickable();
     //remoteButtonsOff();
});

function remoteButtonsClickable(){

    var forward_button = document.getElementById("forward_button");
    forward_button.onclick = function(){
        moveRobot("F",10);
        console.log("forw")
    }
    var backward_button = document.getElementById("backward_button");
    backward_button.onclick = function(){
        moveRobot("B",10);
        console.log("back")
    }
    var left_button = document.getElementById("left_button");
    left_button.onclick = function(){
        moveRobot("L",10);
        console.log("left")
    }
    var right_button = document.getElementById("right_button");
    right_button.onclick = function(){
        moveRobot("R",10);
        console.log("righ")
    }
}
function moveRobot(direction, distance){
   wSocket.send(direction);
}
function openWebSocket(){
    var oliver = "212.25.146.229";
    var serverAddress = "ws://" + oliver + ":" + 1337;
     //var serverAddress = "ws://" + location.hostname + ":" + 8001;
    wSocket = new WebSocket(serverAddress);
    wSocket.onopen= function(event){
        remoteButtonsClickable(wSocket);
    }
    wSocket.onclose = function(event){

    }
}
// window.addEventListener("beforeunload", function (e) {
//   wSocket.close();                         //Webkit, Safari, Chrome
// });