import React, { Component } from 'react';
require('./Grid.css');
import Robot from "./Robot"
class RobotSquare extends Component{
    displayInfo(){
        var carrying_package = "No package";

        if(this.props.robotInfo.carrying_package !== null){
            carrying_package = this.props.robotInfo.carrying_package;
        }

        const obj = {
            type_of_square: "Robot",
            pos_row: this.props.pos_row,
            pos_col: this.props.pos_column,
            carrying_package: carrying_package
        };
        this.props.squareOnClick(obj)
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