/**
 * Created by simonljus on 2017-05-09.
 */
var mWSocket;
import React, { Component } from 'react';
import RobotController from "./RobotController";
import InstructionOverview from "./InstructionOverview";
class WSocket extends Component{

    constructor(props){
        super();
        this.state={
          message: ""
        };
        var loc = location.hostname;
        var that = this;
        //var loc = "130.238.94.57"
        var serverAddress = "ws://" + loc + ":" + 8001;
        console.log(serverAddress);
        mWSocket = new WebSocket(serverAddress);
        mWSocket.onopen = function(event){

        };
        mWSocket.onclose= function(event){

        }
        mWSocket.onmessage = function(evt) {
            that.messageFromServer(evt.data);
        };
    }
    sendToServer(data){
        console.log(data)
        mWSocket.send(data);

    }
    messageFromServer(msg) {
        console.log("FROM SERVER: " + msg);
        this.setState({
            message: msg
        })
    }
    render(){
        return(
            <div>
        <RobotController wsMessage={this.state.message} wsSend={this.sendToServer.bind(this)}/>
        <InstructionOverview wsMessage={this.state.message} wsSend={this.sendToServer.bind(this)}/>
            </div>
        )
    }
}

export default WSocket;