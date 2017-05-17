/**
 * Created by simonljus on 2017-05-11.
 */
import React, { Component } from 'react';
import TabWindow from "./TabWindow";
require('./InstructionOverview.css');
import PropTypes from 'prop-types';

class InstructionOverview extends Component{
    constructor(props) {
        super();
        this.state ={

        };
    }

    messageFromServer(msg){
        console.log("This worked lol:" + msg)
    }
    // Pass on message to WebSocket Component
    handleWS(message){
        this.props.wsSend(message);
    }

    render(){
        console.log("dir received" + this.props.wsMessage);
        return(
            <div className="instructionOverviewContainer"  >

                <TabWindow wsSend={this.handleWS.bind(this)} wsMessage={this.props.wsMessage} plMessage={this.props.plMessage}/>
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