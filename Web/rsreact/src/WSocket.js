/**
 * Created by simonljus on 2017-05-09.
 */

import React, { Component } from 'react';
import RobotController from "./Manual/RobotController";
import InstructionOverview from "./Command/InstructionOverview";
import MapOverview from "./Map/MapOverview";
import * as DataCreator from "./DataCreator";
var mWSocket;  // Make the WebSocket global

/*
The Websocket that communicates with the server
 */
class WSocket extends Component{

    constructor(props){
        super();
        var robot = DataCreator.robotInit();
        var rows = DataCreator.mapMatrixInit();
        var packageList = DataCreator.packageListInit();
        var wareHouse= DataCreator.createWareHouse(rows);
        var tasklist =DataCreator.taskListInit();
        var lists = DataCreator.createMapStateList(rows);
        this.state = {
          message: "",
            task_list:tasklist,
            map:   wareHouse,
            robot: robot,
            packages: packageList,
            m_zones:lists.storageStates,
            m_states: lists.mapStates
        };
        var loc = location.hostname;
        var that = this;
        var serverAddress = "ws://" + loc + ":" + 8001;
        mWSocket = new WebSocket(serverAddress);
        mWSocket.onopen = function(event){
            that.loopMe();

        };
        mWSocket.onclose= function(event){

        };
        // When WebSocket receives sometihng from the server
        mWSocket.onmessage = function(evt) {
            that.messageFromServer(evt.data);
        };
    }
    // Send data to server
    sendToServer(data){
        console.log("SENDING TO SERVER: ")
        console.log(data);
        mWSocket.send(JSON.stringify(data));

    }
    loopMe(){
        var mWSocketPass =mWSocket;
        var ping ={
            type_of_data: "hello",
            data: null
        };
        var pingjson = JSON.stringify(ping);
        setInterval(function(){
            mWSocketPass.send(pingjson);
            console.log("pinging server");
        },5000);
    }
    // Handle the message received from server and change the correct state object
    messageFromServer(msg) {
        console.log("FROM SERVER:");
        var obj = JSON.parse(msg);
        console.log(obj);
        switch(obj.type_of_data){
            case('package_list'):
                this.setState({
                    pl_message: obj.data
            });
                break;

            case('task_list'):
                this.setState({
                    task_list: obj.data

                });
                break;
            case('map'):
                this.setState({
                    map: DataCreator.createWareHouse(obj.data.rows)

                });
                break;
            case('robot'):
                this.setState({
                    robot: obj.data
                });
                break;

            case('all'):
                var lists = DataCreator.createMapStateList(obj.data.map.rows);
                var possibleStates =lists.mapStates;
                var storageZones = lists.storageStates;
                this.setState({
                    robot: obj.data.robot,
                    map: DataCreator.createWareHouse(obj.data.map.rows),
                    packages: DataCreator.packageListHandler(obj.data.packages),
                    m_zones: storageZones,
                    m_states: possibleStates
                });
                break;
            default:
                break
        }
    }
    render(){
        // Pass through the messages from the server as different props
        return(
            <div>
                <MapOverview layout={this.state.map} robotInfo={this.state.robot} packages={this.state.packages}/>
                <RobotController wsMessage={this.state.message} wsSend={this.sendToServer.bind(this)}/>
                <InstructionOverview wsMessage={this.state.message} packages={this.state.packages} task_list={this.state.task_list} wsSend={this.sendToServer.bind(this)} mWSocket={mWSocket} m_zones={this.state.m_zones} m_states={this.state.m_states}/>

            </div>
        )
    }
}

export default WSocket;
