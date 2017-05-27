import React, { Component } from 'react';
require('./Grid.css');
class Square extends Component{
    displayInfo(){
        console.log(this)
    }
    render(){
        return(
            <div className="squareContainer" style={this.props.styleObj} onClick={this.displayInfo.bind(this)}>
                <a className="squareText">{this.props.square_text}</a>
            </div>

        )
    }
}
export default Square
