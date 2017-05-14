/**
 * Created by simonljus on 2017-05-09.
 */

import React, { Component } from 'react';
require('./RobotController.css');


class RobotController extends Component{

    constructor(props){
        super(props);
        this.WS =this.props.ws;

    }

    robotMove(rdir, rdistance){
            var message= rdir;
        console.log("sending "  + message + " to server");
         this.WS.sendToServer(message)
          console.log("sent "  + message + " to server");
    }
    connectionSwitch(status){
        document.getElementById("wsConnectionButton")



    }


    render(){
        return(
            <div>
                <div id="remoteContainer">
                    <div id="topButtons">
                        <button id="forward_button"  data-translatable_string="forward_string" className="moveButton" onClick={this.robotMove.bind(this,"F","10")}> ^ </button>
                    </div>
                    <div id="bottom_buttons">
                        <button id="left_button" data-translatable_string="left_string" className="moveButton" onClick={this.robotMove.bind(this,"L","10")}> &lt; </button>
                        <button id="backward_button" data-translable_string="back_string" className="moveButton" onClick={this.robotMove.bind(this,"B","10")}> v </button>
                        <button id="right_button" data-translatable_string="right_string" className="moveButton" onClick={this.robotMove.bind(this,"R","10")}> &gt; </button>
                    </div>
                </div>
            </div>

        )
    };
}
export default  RobotController
