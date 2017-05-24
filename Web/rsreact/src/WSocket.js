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
        var robot =DataCreator.robotInit();
        var rows = DataCreator.mapMatrixInit();
        var packageList = DataCreator.packageListInit();
        var wareHouse= DataCreator.createWareHouse(rows);
        var mapStates= DataCreator.createMapStateList(rows);
        var tasklist =DataCreator.taskListInit();
        var zonesInit = DataCreator.zoneListInit();
        var intersectionList = DataCreator.intersectionListInit();
        var startZone =DataCreator.startZoneInit();
        this.state={
          message: "",
            task_list:tasklist,
            map:   wareHouse,
            robot: robot,
            package_list: packageList,
            mapStateList: mapStates,
            startZone: startZone,
            m_zones:zonesInit,
            intersection_list:intersectionList,
            m_states: zonesInit

        };
        var loc = location.hostname;
        var that = this;
        var serverAddress = "ws://" + loc + ":" + 8001;
        console.log(serverAddress);
        mWSocket = new WebSocket(serverAddress);
        mWSocket.onopen = function(event){
            that.loopMe();

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
    loopMe(){
        var mWSocketPass =mWSocket;
        var ping ={
            type_of_data: "hello",
            data: null
        }
        var pingjson = JSON.stringify(ping);
        setInterval(function(){
            mWSocketPass.send(pingjson);
            console.log("sending ping to server");
        },30000);
    }
    // Handle the message received from server and change the correct state object
    messageFromServer(msg) {
        console.log("FROM SERVER:");
        console.log(msg);
        var obj = JSON.parse(msg);
        console.log(obj);
        switch(obj.type_of_data){
            case('package_list'):
                this.setState({
                    pl_message: obj.data
            })
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
                var lists = DataCreator.zoneify(obj.data);
                var possibleStates =lists.mapStates;
                var possibleZones = lists.mapZones;
                this.setState({
                    robot: obj.data.robot.data,
                    map: DataCreator.createWareHouse(obj.data.map.data.rows),
                   mapStateList: DataCreator.createMapStateList(obj.data.map.data.rows),
                   startZone: obj.data.start_zone_list[0],
                   package_list:obj.data.package_list.data,
                   m_zones: possibleZones,
                   m_states: possibleStates
                });
                console.log(this.state)

                break;
            default:
                break
        }
    }
    render(){
        // Pass through the messages from the server as different props
        return(
            <div>



                <MapOverview layout={this.state.map} startPoint={this.state.startZone} robotInfo={this.state.robot} packages={this.state.package_list}/>
<RobotController wsMessage={this.state.message} wsSend={this.sendToServer.bind(this)}/>
        <InstructionOverview wsMessage={this.state.message} packages={this.state.package_list} task_list={this.state.task_list} wsSend={this.sendToServer.bind(this)} mWSocket={mWSocket} mapStates={this.state.mapStateList} m_zones={this.state.m_zones} m_states={this.state.m_states}/>

            </div>
        )
    }
}

export default WSocket;