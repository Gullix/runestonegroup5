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
        return(
            <div className="instructionOverviewContainer"  >

                <TabWindow wsSend={this.handleWS.bind(this)} wsMessage={this.props.wsMessage}  packages={this.props.packages} m_zones={this.props.m_zones} m_states={this.props.m_states}/>
                <TaskWindow tasks={this.props.tasks} wsSend={this.handleWS.bind(this)}/>
            </div>


        )
    }
}
export default InstructionOverview


InstructionOverview.propTypes={
    wsSend: PropTypes.func,
    wsMessage: PropTypes.string,
    plMessage: PropTypes.arrayOf(PropTypes.string),
};