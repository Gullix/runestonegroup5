/**
 * Created by simonljus on 2017-05-11.
 */
import React, { Component } from 'react';
import TabWindow from "./TabWindow";
import TaskWindow from "./TaskWindow";
require('./InstructionOverview.css');
import PropTypes from 'prop-types';

class InstructionOverview extends Component{
    // Pass on message to WebSocket Component
    handleWS(message){
        this.props.wsSend(message);
    }

    render(){
        console.log(this.props.mapStates);
        console.log(this.props.m_zones);
        return(
            <div className="instructionOverviewContainer"  >

                <TabWindow wsSend={this.handleWS.bind(this)} wsMessage={this.props.wsMessage} plMessage={this.props.plMessage} packages={this.props.packages} mapStates={this.props.mapStates} m_zones={this.props.m_zones}/>
                <TaskWindow tlMessage={this.props.tlMessage} wsSend={this.handleWS.bind(this)}/>
            </div>


        )
    }
}
export default InstructionOverview


InstructionOverview.propTypes={
    wsSend: PropTypes.func,
    wsMessage: PropTypes.string,
    plMessage: PropTypes.arrayOf(PropTypes.string),
}