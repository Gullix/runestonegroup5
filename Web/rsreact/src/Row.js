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
                    this.props.rowItems.map((square, i) => <Square key={i} value={square.square_id}
                                                                    info={square}>

                    </Square>)}
            </div>

        )
    }
}
export default Row
