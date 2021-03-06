/**
 * Created by simonljus on 2017-05-09.
 */

import React, { Component } from 'react';
require('./RobotController.css');
import PropTypes from 'prop-types';
// For controlling the robot manually
class RobotController extends Component{
    constructor(props){
        super(props)
        this.state={
            manualMode: false
        }
    }

    robotMoveToServer(manual_command){

        let message = {
            type_of_data: "manual_command",
            data: manual_command
        };

        this.props.wsSend(message);
    }
    toggleManual(){
       var  manual_mode = this.state.manualMode
         var message = {
             type_of_data: "manual_on",
             data: null
         }
         if(manual_mode){
            message = {
                 type_of_data: "manual_off",
                 data: null
             };
         }
         this.setState({
             manualMode: !manual_mode
        });
        this.props.wsSend(message);
    }
    victoryToServer() {
        let message = {
            type_of_data: "victory",
            data: null
        };
        this.props.wsSend(message);

    }
    handleKeyPress(event){
        switch(event.key){
            case("w"):
                this.robotMoveToServer("F")
                break;
            case("a"):
                this.robotMoveToServer("L")
                break;
            case("s"):
                this.robotMoveToServer("B")
                break;
            case("d"):
                this.robotMoveToServer("R")
                break;
            case("q"):
                this.robotMoveToServer("X")
                break;
            default:
                break;
        }
    }


    render(){
        var styleObj={
            color: "white",
            verticalAlign: "middle"
        };
        return(
            <div id="robotController">
                <div id="toggle">
                    <div id="toggleText">
                        <span style={styleObj}>Manual toggle</span>
                    </div>
                    <label className="switch" onChange={this.toggleManual.bind(this)}>
                        <input type="checkbox" checked={this.state.manualMode} />
                        <div className="slider" />
                    </label>

                </div>
                <div>
                    <button id="wasdButton" className="btn btn-primary" onKeyPress={this.handleKeyPress.bind(this)} > Wasd mode</button>
                <div id="remoteContainer" >
                    <div id="topButtons">
                        <button id="forward_button"   className="moveButton btn btn-primary" onClick={this.robotMoveToServer.bind(this,"F")}> W </button>
                    </div>
                    <div id="bottom_buttons">
                        <button id="left_button"      className="moveButton btn btn-primary" onClick={this.robotMoveToServer.bind(this,"L")}> A </button>
                        <button id="backward_button"  className="moveButton btn btn-primary" onClick={this.robotMoveToServer.bind(this,"B")}> S </button>
                        <button id="right_button"     className="moveButton btn btn-primary" onClick={this.robotMoveToServer.bind(this,"R")}> D </button>
                    </div>
                </div>
                <button id="stop_button" className="moveButton btn btn-primary" onClick={this.robotMoveToServer.bind(this,"X")}>STOP</button>
                </div>
                <div>
                    <button id="victory_button" className="btn btn-primary" onClick={this.victoryToServer.bind(this)}>VICTORY</button>
                </div>
            </div>

        )
    };
}
export default  RobotController
RobotController.propTypes={
    wsMessage: PropTypes.string,
    wsSend: PropTypes.func
};
