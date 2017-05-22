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
        var rows=[
            ["b","b","z","b","z","b","z","b","b"],
            ["b","b","z","b","z","b","z","b","b"],
            ["s","l","i","l","i","l","i","l","e"],
            ["b","b","l","b","l","b","l","b","b"],
            ["b","b","z","b","z","b","z","b","b"]

        ];
        var robot ={
            position: {"row": 0, "col": 0},
            orientation: "west"
        };

        var packages = this.packagesInit();
        var wareHouse= this.createWareHouse(rows);
        var tasklist =[task];
        this.state={
          message: "",
          pl_message: ["package1", "package2"],
            tl_message:tasklist,
            wh_layout:   wareHouse,
            robot: robot,
            packages: packages

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
            case('package_list'):
                this.setState({
                    pl_message: obj.data
            })
                break;

            case('zl'):
                break;
            case('task_list'):
                this.setState({


                    tl_message: obj.data

            });
                break;
            case('map'):
                this.setState({


                    wh_layout: this.createWareHouse(obj.data.rows)

                });
                break;
            case('robot'):
                this.setState({
                    robot: obj.data
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

    createWareHouse(rows){


        var whMap ={
            colSize: this.largestLaneSize(rows),
            rowSize: rows.length,
            rows:rows,
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
    packagesInit(){
        var package1={
            storedAt:{ row:0, col: 2},
            packageID: "package1",
        }
        var package2={
            storedAt:{ row:4, col: 4},
            packageID: "package1",
        }
        var packages =[package1,package2];
    }
    render(){
        // Pass through the messages from the server as different props
        return(
            <div>

        <RobotController wsMessage={this.state.message} wsSend={this.sendToServer.bind(this)}/>
                <MapOverview layout={this.state.wh_layout} startPoint={[2,0]} robotPos={this.state.robot} packages={this.state.packages}/>
        <InstructionOverview wsMessage={this.state.message} plMessage={this.state.pl_message} tlMessage={this.state.tl_message}wsSend={this.sendToServer.bind(this)} mWSocket={mWSocket}/>
            </div>
        )
    }
}

export default WSocket;