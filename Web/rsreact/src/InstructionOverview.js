/**
 * Created by simonljus on 2017-05-11.
 */
import React, { Component } from 'react';
import TabWindow from "./TabWindow";
require('./InstructionOverview.css');
class InstructionOverview extends Component{
    constructor(props){
        super();

    }

    handleWS(message){
        this.props.ws.sendToServer(message)
    }
    render(){
        return(
            <div className="instructionOverviewContainer" >


                <TabWindow wsSend={this.handleWS.bind(this)}/>
            </div>


        )
    }
}
export default InstructionOverview
/* <TaskWindow></TaskWindow>  */