
/**
 * Created by simonljus on 2017-05-10.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
require('./InstructionWindowTemp.css');
class InstructionWindowTemp extends Component{
    constructor(props){
        super(props);
        this.state = {
            command: 'store',
            optionA: this.props.optionAInit,
            optionB: this.props.optionBInit

        }
        this.handleChange = this.handleChange.bind(this);
    }
    makeCommand(){
        var valA= this.refs.opA.value;
        var valB= this.refs.opB.value;
        var message = valA +"," + valB;
        console.log(message)    ;
        this.props.selCommand(message) ;

    }
    handleChange() {

        this.setState({
            optionA: this.props.optionAInit,
            optionB: this.props.optionBInit
            });
    }



    render(){

          return(

            <div id="instructionContainer">
                <select className="instructionOption" ref="opA"   >
                 
                    {this.props.optionAInit.map((opt,i) => <option key={i}  value={opt}>{opt}</option>)}
                </select>

                 <select className="instructionOption"  ref="opB"  >
                     {this.props.optionBInit.map((opt,i) => <option key={i} value={opt} >{opt}</option>)}
                 </select>
                <button onClick={this.makeCommand.bind(this)}> Make command</button>
            </div>

        )
    }
}
export default InstructionWindowTemp

InstructionWindowTemp.propTypes={
    optionAInit: PropTypes.arrayOf(PropTypes.string),
    optionBInit: PropTypes.arrayOf(PropTypes.string)
}
