/**
 * Created by simonljus on 2017-05-09.
 */
class WSocket{
    constructor(){
        let mWSocket;
        let serverAddress = "ws://" + location.hostname + ":" + 8001;
        mWSocket = new WebSocket(serverAddress);
        mWSocket.onopen = function(event){

        };
        mWSocket.onclose = function(event){

        }
    }
    sendToServer(data){
        this.mWSocket.send(data);
        console.log(data)
    }
}

export default WSocket;