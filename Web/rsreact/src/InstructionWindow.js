/**
 * Created by simonljus on 2017-05-10.
 */
import React, { Component } from 'react';
require('./InstructionWindow.css');
class InstructionWindow extends Component{
    constructor(props){
        super(props)
        this.state = {
            value: 'hello',
            item: 'package',
            command: 'store',

        }
         this.handleChange = this.handleChange.bind(this);
    }
    makeCommand(){
        
    }
    handleChange(change) {

        this.setState({
            command:change.target.value
            });
    }

    render(){
             console.log(this.state);
        return(
            <div id="instructionContainer">
                <select className="instructionOption"   value={this.state.command} onChange={this.handleChange}>
                    <option value="Package1">Package1</option>
                    <option value="Package2">Package2</option>
                </select>
                <button onClick={this.makeCommand.bind}>Make command</button>
            </div>

    )
    }
}
export default InstructionWindow

