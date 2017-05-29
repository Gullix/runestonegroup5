import React, { Component } from 'react';
require('./InstructionWindow.css');
class NewPackageCommandWindow extends Component{
    constructor(){
        super();
        this.state={
            min_light: 0,
            max_light: 100,
            min_temperature: -273,
            max_temperature: 50
        }
    }

    makeNewPackageCommand(){
        if(this.validateForm()){
            console.log(this.state);
            let pickupLocation = this.refs.pickupOption.value;
            let message = {
                type_of_data: "new_package",
                data:  {
                    from_location: pickupLocation,
                    requirements:{
                        min_light:  this.state.min_light,
                        max_light: this.state.max_light,
                        min_temperature: this.state.min_temperature,
                        max_temperature: this.state.max_temperature
                    }
                },

            };
            this.props.sendCommand(message);
        }


    }
    validateForm(){
        return true;
    }
    handleInputChange(event){
        const target = event.target;
        const value =  target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    render() {
        let pickupOption = this.props.pickupOption.map(function (opt, i) {
            return (
                <option key={i} value={opt.zone_id}>{opt.zone_id}</option>
            )
        });

        return (

            <div id="instructionContainer">
                <select className="instructionOption" ref="pickupOption" >
                    {pickupOption}
                </select>
                <button className="btn btn-primary" onClick={this.makeNewPackageCommand.bind(this)}>New package</button>
                <form  onChange={this.handleInputChange.bind(this)}>
                    <input placeholder="Min temperature" type="number" name="min_temperature"  step="any" min="-273.15" max="30"/>
                    <input placeholder="Max temperature" type="number" name="max_temperature" step="any" min="-273.15" max="30"/>
                    <input placeholder="Minimum light" type="number" name="min_light"  step="any"min="0" max="1000"/>
                    <input placeholder="Maximum light " type="number" name="max_light"  step="any"min="0" max="1000"/>
                </form>

            </div>

        )
    }
}
export default NewPackageCommandWindow