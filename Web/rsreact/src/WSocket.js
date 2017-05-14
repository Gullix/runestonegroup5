/**
 * Created by simonljus on 2017-05-09.
 */
var mWSocket;
class WSocket{

    constructor(){
        var loc = location.hostname;
        //var loc = "130.238.94.57"
        let serverAddress = "ws://" + loc + ":" + 8001;
        mWSocket = new WebSocket(serverAddress);
        mWSocket.onopen = function(event){

        };
        mWSocket.onclose = function(event){

        }
    }
    sendToServer(data){
        console.log(data)
        mWSocket.send(data);

    }
}

export default WSocket;