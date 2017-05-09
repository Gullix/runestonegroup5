/**
 * Created by simonljus on 2017-05-09.
 */
class WSocket{
    constructor(){
        var mWSocket;
        var serverAddress = "ws://" + location.hostname + ":" + 8001;
        mWSocket = new WebSocket(serverAddress);
        mWSocket.onopen= function(event){

        }
        mWSocket.onclose = function(event){

        }
    }
    send(data){
        this.mWSocket.send(data);
        console.log(data)
    }
}

export default WSocket;
