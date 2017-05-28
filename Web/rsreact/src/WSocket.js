/**
 * Created by simonljus on 2017-05-09.
 */

import React, { Component } from 'react';
import RobotController from "./Manual/RobotController";
import InstructionOverview from "./Command/InstructionOverview";
import MapOverview from "./Map/MapOverview";
import * as DataCreator from "./DataCreator";
var mWSocket;  // Make the WebSocket global
var interval;

/*
The Websocket that communicates with the server
 */
class WSocket extends Component{

    constructor(props){
        super();
        let robot = DataCreator.robotInit();
        let rows = DataCreator.mapMatrixInit();
        let package_list = DataCreator.packageListInit();
        let warehouse= DataCreator.createWareHouse(rows);
        let tasks =DataCreator.taskListInit();
        let lists = DataCreator.createMapStateList(rows);
        this.state = {
            tasks:tasks,
            map:   warehouse,
            robot: robot,
            packages: package_list,
            m_zones:lists.storageStates,
            m_states: lists.mapStates,
            m_deliver_zones:lists.deliverZones
        };
        const loc = location.hostname;
        let that = this;
        const serverAddress = "ws://" + loc + ":" + 8001;
        mWSocket = new WebSocket(serverAddress);
        mWSocket.onopen = function(event){
            that.pingOnce()
            that.loopMe();

        };
        mWSocket.onclose= function(event){
           clearInterval(interval);

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
        let mWSocketPass =mWSocket;
        const ping ={
            type_of_data: "hello",
            data: null
        };
        let ping_json = JSON.stringify(ping);
         interval =setInterval(function(){
            mWSocketPass.send(ping_json);
            console.log("pinging server");
        },500);
    }
    pingOnce(){
        let mWSocketPass =mWSocket;
        const ping ={
            type_of_data: "hello",
            data: null
        };
        let ping_json = JSON.stringify(ping);
        mWSocketPass.send(ping_json);
        console.log("pinging server");
    }
    // Handle the message received from server and change the correct state object
    messageFromServer(msg) {
        console.log("FROM SERVER:");
        let obj = JSON.parse(msg);
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
                let lists = DataCreator.createMapStateList(obj.data.map.rows);

                this.setState({
                    robot: obj.data.robot,
                    map: DataCreator.createWareHouse(obj.data.map.rows),
                    packages: DataCreator.packageListHandler(obj.data.packages),
                    m_zones: lists.storageStates,
                    m_states: lists.mapStates,
                    tasks: obj.data.tasks,
                    m_deliver_zones:lists.deliverZones
                });
                break;
            default:
                break
        }
    }
    render(){
        console.log(this.state.m_deliver_zones);
        // Pass through the messages from the server as different props
        return(
            <div>
                <MapOverview layout={this.state.map} robotInfo={this.state.robot} packages={this.state.packages}/>
                <RobotController wsSend={this.sendToServer.bind(this)}/>
                <InstructionOverview  packages={this.state.packages} tasks={this.state.tasks} wsSend={this.sendToServer.bind(this)}  m_zones={this.state.m_zones} m_states={this.state.m_states} m_deliver_zones={this.state.m_deliver_zones}/>

            </div>
        )
    }
}

export default WSocket;
