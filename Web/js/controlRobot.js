$(function(){
     remoteButtonsClickable();
});

function remoteButtonsClickable(){

    var forward_button = document.getElementById("forward_button");
    forward_button.onclick = function(){
        moveRobot("forward",10);
    }
    var backward_button = document.getElementById("backward_button");
    backward_button.onclick = function(){
        moveRobot("backward",10);
    }
    var left_button = document.getElementById("left_button");
    forward_button.onclick = function(){
        moveRobot("left",10);
    }
    var right_button = document.getElementById("right_button");
    forward_button.onclick = function(){
        moveRobot("right",10);
    }
}
function moveRobot(direction, distance){
    var serverAdress = "/";
    $.get(serverAdress + direction);

}