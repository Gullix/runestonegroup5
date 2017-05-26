import React, { Component } from 'react';
require('./InstructionWindow.css');
class NewStorageLocationCommandWindow extends Component{

    makeNewStorageLocationCommand(){
        let selectedFromStorage = this.refs.fromStorageOption.value;
        let selectedToStorage = this.refs.toStorageOption.value;
        let message = {
            type_of_data: "new_storage_location",
            data: {
                from_location: selectedFromStorage,
                to_location: selectedToStorage
            }
        };
        this.props.sendCommand(message);

    }
    handleOptionChange(){
        //maybetodo
        this.props.changeOptions(this.props.tab,this.refs.fromStorageOption.value);
    }
    render() {
        var fromStorageOption = this.props.fromStorageOption.map(function (opt, i) {
            return (
                <option key={i} value={opt.zone_id}>{opt.zone_id}</option>
            )
        });
        var toStorageOption = this.props.fromStorageOption.map(function (opt, i) {

            return (

                <option key={i} value={opt.zone_id}> {opt.zone_id} </option>
            )

        });


        return (

            <div id="instructionContainer">
                <select className="instructionOption" ref="fromStorageOption" onChange={this.handleOptionChange.bind(this)}>
                    {fromStorageOption}
                </select>

                <select className="instructionOption" ref="toStorageOption">
                    {toStorageOption}
                </select>
                <button onClick={this.makeNewStorageLocationCommand.bind(this)}>Send task</button>
            </div>

        )
    }
}
export default NewStorageLocationCommandWindow
