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
    handleChange() {
        console.log("YO");
        this.setState({
            value:event.target.value
            });
    }

    render(){

        return(
            <div id="instructionContainer">
                <select className="instructionOption"   value={this.state.value} onChange={this.handleChange}>
                    <option value="store" >Store</option>
                    <option value="pickUp">Pick up</option>
                </select>
                <select className="instructionOption">
                    <option value="Package1">Package1</option>
                    <option value="Package2">Package2</option>
                </select>
                <button onClick={this.makeCommand.bind}>Make command</button>
            </div>

    )
    }
}
export default InstructionWindow

