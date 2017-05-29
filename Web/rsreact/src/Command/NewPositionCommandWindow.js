import React, { Component } from 'react';
require('./InstructionWindow.css');
class NewPositionCommandWindow extends Component{

    makeNewPositionCommand(){
        let selectedPosition = this.refs.positionOption.value;
        let message = {
            type_of_data: "moveTo",
            data:  selectedPosition,

        };
        this.props.sendCommand(message);

    }
    handleOptionChange(){
        //maybetodo
        this.props.changeOptions(this.props.tab,this.refs.positionOption.value);
    }
    render() {
        let positionOption = this.props.positionOption.map(function (opt, i) {
            return (
                <option key={i} value={opt.zone_id}>{opt.zone_id}</option>
            )
        });


        return (

            <div id="instructionContainer">
                <select className="instructionOption" ref="positionOption" onChange={this.handleOptionChange.bind(this)}>
                    {positionOption}
                </select>
                <button className="btn btn-primary" onClick={this.makeNewPositionCommand.bind(this)}>Move robot to postition</button>
            </div>

        )
    }
}
export default NewPositionCommandWindow
