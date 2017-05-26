import React, { Component } from 'react';
require('./InstructionWindow.css');
class NewPackageCommandWindow extends Component{

    makeNewPackageCommand(){
        console.log(this)
        let storageLocation = this.refs.storageOption.value;
        let pickupLocation = this.refs.pickupOption.value;
        let message = {
            type_of_data: "new_package",
            data:  {
                to_location: storageLocation,
                from_location: pickupLocation,
                requirements:{
                    light:  0,
                    temperature: 0
                }
            },

        };
        this.props.sendCommand(message);

    }
    render() {
        let pickupOption = this.props.pickupOption.map(function (opt, i) {
            return (
                <option key={i} value={opt.zone_id}>{opt.zone_id}</option>
            )
        });
        let storageOption = this.props.storageOption.map(function (opt, i) {
            return (
                <option key={i} value={opt.zone_id}>{opt.zone_id}</option>
            )
        });

        return (

            <div id="instructionContainer">
                <select className="instructionOption" ref="pickupOption" >
                    {pickupOption}
                </select>
                <select className="instructionOption" ref="storageOption" >
                    {storageOption}
                </select>
                <form onsubmit={this.makeNewPackageCommand.bind(this)}>
                    <input type="number" name="max_temperature" step="any" min="-273.15" max="300"/>
                    <input type="number" name="min_temperature"  step="any" min="-273.15" max="300"/>
                    <input type="number" name="min_light"  step="any"min="0" max="1000"/>
                    <input type="number" name="max_light"  step="any"min="0" max="1000"/>
                    <input type="submit" value="New package"   />

                </form>
                <button onClick={this.makeNewPackageCommand.bind(this)}>Add package</button>
            </div>

        )
    }
}
export default NewPackageCommandWindow