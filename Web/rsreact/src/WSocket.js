/**
 * Created by simonljus on 2017-05-09.
 */

import React, { Component } from 'react';
import RobotController from "./RobotController";
import InstructionOverview from "./InstructionOverview";
import MapOverview from "./MapOverview";
var mWSocket;  // Make the WebSocket global

/*
The Websocket that communicates with the server
 */
class WSocket extends Component{

    constructor(props){
        super();
        var task = {action:"Move", args:["package1337"], task_id:0};
        var wareHouse= this.createWareHouse();
        var tasklist =[task];
        this.state={
          message: "",
          pl_message: ["package1", "package2"],
            tl_message:tasklist,
            wh_layout:   wareHouse
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
        var obj = JSON.parse(msg);
        console.log(obj.type_of_data);
        switch(obj.type_of_data){
            case('pl'):
                this.setState({
                    pl_message: obj.args
            })
                break;

            case('zl'):
                break;
            case('tl'):
                this.setState({


                    tl_message: obj.tl

            });
                break;
            default:
                break
        }
        /* Fix so there will be multiple state variables that are unique for the specific components
           Make a parser here so we only have to parse here and not have a parser everywhere
         */
        this.setState({
            message: msg
        })
    }

    createWareHouse(){
        var p1={
            packageId: "p1",
            light:"",
            humidity: ""
        }

           var p2={
               packageId: "p2",
               light:"",
               humidity: ""
           }


           
        var z1={
            storage:null,
            zoneId: "z1",
        }
        var z2={
            storage:p1,
            zoneId: "z2",
        }
        var z3={
            storage:null,
            zoneId: "z3",
        }

         var z4={
             storage:null,
             zoneId: "z4",
         }

          var z5={
              storage:null,
              zoneId: "z5",
          }

           var z6={
               storage:p2,
               zoneId: "z3",
           }


        var leftStorageLane = [z1,z2,z3];
        var rightStorageLane = [z4,z5,z6];
        var storageLanes = [leftStorageLane,rightStorageLane];
        var colSize = 2*this.largestLaneSize(storageLanes)    + 3;
        var rowSize =  4* (storageLanes.length -1) +1;
        var whMap ={
            colSize: colSize,
            rowSize: rowSize,
            storageLanes:storageLanes,
            layout: "standard"
        }
        return whMap;


    }
    largestLaneSize(lanes){
        var max =0
         for(var i=0;i<lanes.length; i++){

            if( lanes[0].length  > max){
                max = lanes[0].length;
            }
         }
         return max;
        }
    render(){
        // Pass through the messages from the server as different props
        return(
            <div>

        <RobotController wsMessage={this.state.message} wsSend={this.sendToServer.bind(this)}/>
                <MapOverview layout={this.state.wh_layout} />
        <InstructionOverview wsMessage={this.state.message} plMessage={this.state.pl_message} tlMessage={this.state.tl_message}wsSend={this.sendToServer.bind(this)} mWSocket={mWSocket}/>
            </div>
        )
    }
}

export default WSocket;