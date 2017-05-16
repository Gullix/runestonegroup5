/**
 * Created by simonljus on 2017-05-11.
 */
import React, { Component } from 'react';
import TabWindow from "./TabWindow";
require('./InstructionOverview.css');
class InstructionOverview extends Component{
    constructor(props) {
        super();
        this.state ={

        };
    }

    handleWS(message){
        this.props.wsSend(message);
    }
    render(){
        console.log("dir received" + this.props.wsMessage);
        return(
            <div className="instructionOverviewContainer"  >

                <TabWindow wsSend={this.handleWS.bind(this)}/>
            </div>


        )
    }
}
export default InstructionOverview
/* <TaskWindow></TaskWindow>  */