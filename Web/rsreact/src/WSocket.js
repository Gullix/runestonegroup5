/**
 * Created by simonljus on 2017-05-09.
 */
class WSocket{
    constructor(){
        let mWSocket;
        var oliver = "212.25.146.229"
        //let serverAddress = "ws://" + location.hostname + ":" + 8001;
        let serverAddress = "ws://" + oliver + ":" + 1337;
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