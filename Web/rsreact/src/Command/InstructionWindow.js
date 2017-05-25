
/**
 * Created by simonljus on 2017-05-10.
 */


/*
 ONLY USE FOR REFERENCE
*/


/*
import React, { Component } from 'react';
import PropTypes from 'prop-types';
require('./InstructionWindow.css');

class InstructionWindow extends Component{
    makeCommand(){
        var valB ="";
        if(this.props.tab === 0 || this.props.tab === 1){
            valB=  "," + this.refs.opB.value;
        }
        var valA= this.refs.opA.value;
        var message = valA +"" + valB;
        this.props.selCommand(message);

    }
    positionCommand(){
        let selectedPosition = this.refs.opA.value;
        let message = {
            type_of_data: "moveTo",
            data: selectedPosition
        };
        this.props.selCommand(message);

    }
    handleOptionChange(){
        //
        this.props.changeOptions(this.props.tab,this.refs.opA.value);
    }
    render() {

        var tabChosen = this.props.tab;

        var optionA = this.props.optionAInit.map(function (opt, i) {
            if (tabChosen === 0) {
                return (
                    <option key={i+'a'} value={opt.package_id}>{opt.package_id}</option>
                )
            }
            else if (tabChosen === 1) {
                    return (<option key={i+'b'} value={opt.zone_id}>{opt.zone_id}</option>)
                }

            else if (tabChosen === 2) {
                return (<option key={i+'c'} value={opt.zone_id}>{opt.zone_id}</option>)
            }
            else{
                return null
            }
        });
        if(tabChosen ===1 || tabChosen === 0) {
            var optionB = this.props.optionBInit.map(function (opt, i) {
                if (tabChosen === 0) {
                    return (

                        <option key={i + 's'} value={opt.zone_id}> {opt.zone_id} </option>
                    )
                }
                else if (tabChosen === 1) {
                    return (<option key={i + 'e'} value={opt.zone_id}> {opt.zone_id} </option>)
                }
                else if (tabChosen === 2) {
                    return (<option key={i + 'f'} value={"hej" + i}>{"tjena" + i}</option>)
                }
                else {
                    return null;
                }

            });


            return (

                <div id="instructionContainer">
                    <select className="instructionOption" ref="opA" onChange={this.handleOptionChange.bind(this)}>
                        {optionA}
                    </select>

                    <select className="instructionOption" ref="opB">
                        {optionB}
                    </select>
                    <button onClick={this.makeCommand.bind(this)}> Make command</button>
                </div>

            )
        }
        else{
            return(
                <div id="instructionContainer">
                    <select className="instructionOption" ref="opA" onChange={this.handleOptionChange.bind(this)}>
                        {optionA}
                    </select>
                    <button onClick={this.positionCommand.bind(this)}> Make command</button>
                </div>
            )
        }
    }
}
export default InstructionWindow

InstructionWindow.propTypes={
    optionAInit: PropTypes.arrayOf(PropTypes.object),
    optionBInit: PropTypes.arrayOf(PropTypes.object)
};

*/
