/**
 * Created by simonljus on 2017-05-09.
 */
var mWSocket;
class WSocket{

    constructor(){

        let serverAddress = "ws://" + location.hostname + ":" + 8001;
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