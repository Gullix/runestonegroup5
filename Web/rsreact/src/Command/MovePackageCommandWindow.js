/**
 * Created by simonljus on 2017-05-25.
 */
import React, { Component } from 'react';
require('./InstructionWindow.css');
class MovePackageCommandWindow extends Component{

    makeMovePackageCommand(){
        let selectedPackageId = this.refs.packageOption.value;
        let selectedStorage = this.refs.storageOption.value;
        let message = {
            type_of_data: "move_package",
            data: {
                package_id: selectedPackageId,
                to_location: selectedStorage
            }
        };
        this.props.sendCommand(message);

    }
    handleOptionChange(){
        //maybetodo
        this.props.changeOptions(this.props.tab,this.refs.packageOption.value);
    }
    render() {
        var packageOption = this.props.packageOption.map(function (opt, i) {
                  return (
                    <option key={i} value={opt.package_id}>{opt.package_id}</option>
                )
        });
            var storageOption = this.props.storageOption.map(function (opt, i) {

                    return (

                        <option key={i} value={opt.zone_id}> {opt.zone_id} </option>
                    )

            });


            return (

                <div id="instructionContainer">
                    <select className="instructionOption" ref="packageOption" onChange={this.handleOptionChange.bind(this)}>
                        {packageOption}
                    </select>

                    <select className="instructionOption" ref="storageOption">
                        {storageOption}
                    </select>
                    <button onClick={this.makeMovePackageCommand.bind(this)}>Send task</button>
                </div>

            )
        }
}
export default MovePackageCommandWindow
