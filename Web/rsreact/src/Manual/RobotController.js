/**
 * Created by simonljus on 2017-05-09.
 */

import React, { Component } from 'react';
require('./RobotController.css');
import PropTypes from 'prop-types';
// For controlling the robot manually
class RobotController extends Component{

    //
    robotMoveToServer(rdir, rdistance){
        var message = {
            type_of_data: "manual",
            data: rdir
        };

        this.props.wsSend(message);
    }
    connectionSwitch(status){
        document.getElementById("wsConnectionButton");

    }


    render(){
        return(
            <div>
                <div id="remoteContainer">
                    <div id="topButtons">
                        <button id="forward_button"   className="moveButton btn btn-primary" onClick={this.robotMoveToServer.bind(this,"F","10")}> ^ </button>
                    </div>
                    <div id="bottom_buttons">
                        <button id="left_button"      className="moveButton btn btn-primary" onClick={this.robotMoveToServer.bind(this,"L","10")}> &lt; </button>
                        <button id="backward_button"  className="moveButton btn btn-primary" onClick={this.robotMoveToServer.bind(this,"B","10")}> v </button>
                        <button id="right_button"     className="moveButton btn btn-primary" onClick={this.robotMoveToServer.bind(this,"R","10")}> &gt; </button>
                    </div>
                </div>
            </div>

        )
    };
}
export default  RobotController
RobotController.propTypes={
    wsMessage: PropTypes.string,
    wsSend: PropTypes.func
}
