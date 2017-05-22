/**
 * Created by simonljus on 2017-05-21.
 */
import React, { Component } from 'react';
import Square from "./Square";
class Row extends Component{

    render(){
        return(
            <div className="rowContainer">
                {
                    this.props.rowItems.map((square, i) => <Square key={i} squareType={square} pos_row={this.props.rowIndex} pos_col={i} robotPos={this.props.robotPos} packages={this.props.packages}/>)
                }

            </div>

        )
    }
}
export default Row
