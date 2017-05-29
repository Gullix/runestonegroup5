/**
 * Created by Jeff on 2017-05-28.
 */
import React, { Component } from 'react';
require('./InstructionWindow.css');
class ExtractPackageCommandWindow extends Component{

    extractPackageCommand(){
        let selectedPackageId = this.refs.packageOption.value;
        let selectedStorage = this.refs.storageOption.value;
        let message = {
            type_of_data: "extract_package",
            data: {
                package_id: selectedPackageId,
                to_location: selectedStorage
            }
        };
        this.props.sendCommand(message);

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
                <select className="instructionOption" ref="packageOption">
                    {packageOption}
                </select>

                <select className="instructionOption" ref="storageOption">
                    {storageOption}
                </select>
                <button className="btn btn-primary" onClick={this.extractPackageCommand.bind(this)}>Extract package</button>
            </div>

        )
    }
}
export default ExtractPackageCommandWindow