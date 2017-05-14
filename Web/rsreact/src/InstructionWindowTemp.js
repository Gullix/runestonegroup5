
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
            option0: this.props.op1Init,
            option1: this.props.op2Init

        }
        this.handleChange = this.handleChange.bind(this);
    }
    makeCommand(){
        var val= this.refs.op1.value;
        var val2= this.refs.op2.value;
        console.log(val +"," + val2)    ;

    }
    handleChange() {

        this.setState({
            option0: this.props.op1Init,
            option1: this.props.op2Init
            });
    }
    optionify(num){
        if(num === 0){
            return( this.state.option0.map((opt,i) => <option key={i + "hello"} value={i + "hello"}>{opt}</option>));
        }
        else if(num === 1){
             return( this.state.option1.map((opt,i) => <option key={i} value={i}>{opt}</option>));
        }

    }


    render(){

          return(

            <div id="instructionContainer">
                <select className="instructionOption" ref="op1"   >
                 
                    {this.props.op1Init.map((opt,i) => <option key={i}  value={opt}>{opt}</option>)}
                </select>

                 <select className="instructionOption"  ref="op2"  >
                     {this.props.op2Init.map((opt,i) => <option key={i} value={opt} >{opt}</option>)}
                 </select>
                <button onClick={this.makeCommand.bind(this)}> Make command</button>
            </div>

        )
    }
}
export default InstructionWindowTemp

InstructionWindowTemp.propTypes={
    op1Init: PropTypes.arrayOf(PropTypes.string),
    op2Init: PropTypes.arrayOf(PropTypes.string)
}
