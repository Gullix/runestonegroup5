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
        let rows = [];

        let rowSize = this.props.rowSize;
        let colSize = this.props.colSize;
        for(let i =0; i< rowSize;i++){

            let row = {
                row_id:i,
                items: []
            };
            for(let j=0; j <colSize; j++){
                let square = {
                       square_id: [i,j]
                };
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
                    this.props.rows.map((row, i) => <Row key={i} rowItems={row} rowIndex={i} robotInfo={this.props.robotInfo} packages={this.props.packages}/>)
                }

            </div>

        )
    }
}
export default Grid
