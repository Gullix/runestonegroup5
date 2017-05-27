import React, { Component } from 'react';
require('./Grid.css');
import Robot from "./Robot"
class RobotSquare extends Component{
    displayInfo(){
        console.log(this)
    }
    render(){

        return(
            <div className="squareContainer" style={this.props.styleObj} onClick={this.displayInfo.bind(this)}>
                <a className="squareText">{this.props.square_text}</a>
                <Robot robotInfo={this.props.robotInfo}> </Robot>
            </div>

        )
    }
}
export default RobotSquare