/**
 * Created by simonljus on 2017-05-09.
 */

import React, { Component } from 'react';
import RobotController from "./RobotController";
import InstructionOverview from "./InstructionOverview";
var mWSocket;  // Make the WebSocket global

/*
The Websocket that communicates with the server
 */
class WSocket extends Component{

    constructor(props){
        super();
        this.state={
          message: ""
        };
        var loc = location.hostname;
        var that = this;
        var serverAddress = "ws://" + loc + ":" + 8001;
        console.log(serverAddress);
        mWSocket = new WebSocket(serverAddress);
        mWSocket.onopen = function(event){

        };
        mWSocket.onclose= function(event){

        }
        // When WebSocket receives sometihng from the server
        mWSocket.onmessage = function(evt) {
            that.messageFromServer(evt.data);
        };
    }
    // Send data to server
    sendToServer(data){
        console.log(data)
        mWSocket.send(data);

    }
    // Handle the message received from server and change the correct state object
    messageFromServer(msg) {
        console.log("FROM SERVER: " + msg);
        /* Fix so there will be multiple state variables that are unique for the specific components
           Make a parser here so we only have to parse here and not have a parser everywhere
         */
        this.setState({
            message: msg
        })
    }
    render(){
        // Pass through the messages from the server as different props
        return(
            <div>

        <RobotController wsMessage={this.state.message} wsSend={this.sendToServer.bind(this)}/>
        <InstructionOverview wsMessage={this.state.message} wsSend={this.sendToServer.bind(this)} mWSocket={mWSocket}/>
            </div>
        )
    }
}

export default WSocket;