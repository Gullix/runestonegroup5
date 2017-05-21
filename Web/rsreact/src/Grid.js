/**
 * Created by simonljus on 2017-05-21.
 */
import React, { Component } from 'react';
import Row from "./Row";
class Grid extends Component{

    constructor(props){
        super(props) ;
        this.state={
            rows: this.rowify()
        }


    }
    rowify(){
        var rows = [];

        var rowSize= this.props.rowSize;
        var colSize = this.props.colSize;
        for(var i =0; i< rowSize;i++){

            var row={
                row_id:i,
                items: []
            }
            for( var j=0; j <colSize; j++){
                var square={
                       square_id: [i,j]
                }
                 row.items.push(square)
            }
            rows.push(row);

        }
       return rows;
    }
    render(){
        return(
            <div className="gridContainer list-group">
                {
                    this.state.rows.map((row, i) => <Row key={i} value={row.row_id} rowItems={row.items}/>)
                }

            </div>

        )
    }
}
export default Grid
