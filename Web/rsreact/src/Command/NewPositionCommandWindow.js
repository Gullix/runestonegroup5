import React, { Component } from 'react';
require('./InstructionWindow.css');
class NewPositionCommandWindow extends Component{

    makeNewPositionCommand(){
        let selectedPosition = this.refs.positionOption.value;
        let message = {
            type_of_data: "moveTo",
            data: {
                state_info: selectedPosition,
            }
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
                <button onClick={this.makeNewPositionCommand.bind(this)}>Send task</button>
            </div>

        )
    }
}
export default NewPositionCommandWindow
