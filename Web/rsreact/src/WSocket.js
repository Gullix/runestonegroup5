/**
 * Created by simonljus on 2017-05-09.
 */

import React, { Component } from 'react';
import RobotController from "./Manual/RobotController";
import InstructionOverview from "./Command/InstructionOverview";
import MapOverview from "./Map/MapOverview";
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
            position: {
                row: 0,
                column: 0},
            orientation: "west",
            has_package: false
        };

        var packageList = this.packageListInit();
        var wareHouse= this.createWareHouse(rows);
        var mapStates= this.createMapStateList(rows);
        var tasklist =[task];
        var zonesInit = this.zoneListInit();
        var startZone= {
            position: {
                row: 2,
                column: 0
            },
            start_zone_id: "startzone1"
        }

        this.state={
          message: "",
          pl_message: ["package1", "package2"],
            tl_message:tasklist,
            map:   wareHouse,
            robot: robot,
            package_list: packageList,
            mapStateList: mapStates,
            startZone: startZone,
            m_zones:zonesInit

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

            case('zl'):
                break;
            case('task_list'):
                this.setState({


                    tl_message: obj.data

            });
                break;
            case('map'):
                this.setState({
                    map: this.createWareHouse(obj.data.rows)

                });
                break;
            case('robot'):
                this.setState({
                    robot: obj.data
                });
                break;

            case('all'):
                this.setState({
                    robot: obj.data.robot.data,
                    map: this.createWareHouse(obj.data.map.data.rows),
                   mapStateList: this.createMapStateList(obj.data.map.data.rows),
                   startZone: obj.data.start_zone_list[0],
                   package_list:obj.data.package_list.data,
                   m_zones: this.zoneify(obj.data)
                });
                console.log(this.state)

                break;
            default:
                break
        }
        /* Fix so there will be multiple state variables that are unique for the specific components
           Make a parser here so we only have to parse here and not have a parser everywhere
         */

        /*
        this.setState({
            message: msg
        })
        */
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
    packageListInit(){
        var package1={
            position:{ row:0, column: 2},
            package_id: "package1",
        }
        var package2={
            position:{ row:4, column: 4},
            package_id: "package2",
        }
        var packages =[package1,package2];
        return (packages);
    }
    zoneListInit(){
        var package1={
            position:{ row:0, column: 2},
            zone_id: "zone1",
        }
        var package2={
            position:{ row:4, column: 4},
            zone_id: "zone2",
        }
        var zones =[package1,package2];
        return (zones);
    }
    createMapStateList(rows){
        var mapStates =[];
        var mapState =null;
        var mapStateRows = [];
        var mapStateColumns = [];
        for(var i =0; i < rows.length;i++){
            var row = rows[i];
            for(var j=0; j< row.length; j++){
                switch(row[j]){
                    case("z"):
                        mapState={
                            position: {
                                row: i,
                                column: j
                            }
                        }
                        mapStates.push(mapState);
                        break;
                    case("i"):
                        mapState={
                            position: {
                                row: i,
                                column: j
                            }
                        }

                        mapStates.push(mapState);
                        break;
                    case("s"):
                        mapState={
                            position: {
                                row: i,
                                column: j
                            }
                        }
                        mapStates.push(mapState);
                        break;
                    case("e"):
                        mapState={
                            position: {
                                row: i,
                                column: j
                            }
                        }
                        mapStates.push(mapState);
                        break;
                    default:
                        break;
                }
            }
        }
        return mapStates;
    }
    zoneify(zonelists){
        var zoneItems=[];
        var zoneItem = null;
       var startZones = zonelists.start_zone_list;
        var storageZones = zonelists.storage_zone_list;
       for (let i =0;i <startZones.length;i++){
           var startZone = startZones[i];
           zoneItem ={
               zone_id: startZone.start_zone_id,
               position: startZone.position
           }
           zoneItems.push(zoneItem)
       }
        for (let i =0;i <storageZones.length;i++){
            var storageZone = storageZones[i];
            zoneItem ={
                zone_id: storageZone.storage_zone_id,
                position: storageZone.position
            }
            zoneItems.push(zoneItem)
        }

        var endZones = zonelists.end_zone_list;
        for (let i =0;i <endZones.length;i++){
            var endZone = endZones[i];
             zoneItem ={
                zone_id: endZone.end_zone_id,
                position: endZone.position
            }
            zoneItems.push(zoneItem)
        }
        return zoneItems
    }
    render(){
        // Pass through the messages from the server as different props
        return(
            <div>



                <MapOverview layout={this.state.map} startPoint={this.state.startZone} robotInfo={this.state.robot} packages={this.state.package_list}/>
<RobotController wsMessage={this.state.message} wsSend={this.sendToServer.bind(this)}/>
        <InstructionOverview wsMessage={this.state.message} plMessage={this.state.pl_message} packages={this.state.package_list} tlMessage={this.state.tl_message} wsSend={this.sendToServer.bind(this)} mWSocket={mWSocket} mapStates={this.state.mapStateList} m_zones={this.state.m_zones}/>

            </div>
        )
    }
}

export default WSocket;