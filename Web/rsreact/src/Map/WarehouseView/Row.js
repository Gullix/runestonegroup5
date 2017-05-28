/**
 * Created by simonljus on 2017-05-21.
 */
import React, {Component} from 'react';
import Square from "./Square";
import RobotSquare from "./RobotSquare"
import PackageSquare from "./PackageSquare"
require('./Grid.css');
class Row extends Component {
// props: rowItems={row} rowIndex={i} robotInfo={this.props.robotInfo} packages={this.props.packages}/
    setDesign(square_id) {
        var square_color = "white";
        var square_text = "";
        switch (square_id.charAt(0)) {

            case("b"):
                square_color = "white";
                break;
            case("z"):
                square_color = "purple";
                square_text = square_id;
                break;
            case("i"):
                square_color = "robotbob.svg";
                square_text = square_id;
                break;
            case("l"):
                square_color = "blue";
                break;
            case("s"):
                square_color = "green";
                square_text = square_id;
                break;
            case("e"):
                square_color = "red";
                square_text = square_id;
                break;
            default:
                square_color = "white";
                break;

        }
        return {
            square_color: square_color,
            square_text: square_text
        }
    }
    packageCheck(column_index) {
        let that = this;
        var pCheck = this.props.packages.map(function (pack, i) {
            if (pack.position.row === that.props.rowIndex && pack.position.column === column_index && !pack.in_transit) {
                return (
                    pack
                )
            }
            return null


        });
        for(var j =0; j < pCheck.length; j++){
            if(pCheck[j] != null){
                return pCheck[j]
            }
        }
        return null

    }

    squareInformation(obj){
        this.props.squareOnClick(obj)
    }

    render() {
        let that = this;
        var manySquares = this.props.rowItems.map(function (square, i) {
            var design = that.setDesign(square);
            var styleObj = {
                backgroundColor: design.square_color,
            };
            var result = that.packageCheck(i);
            if (that.props.robotInfo.position.row === that.props.rowIndex && that.props.robotInfo.position.column === i) {
                return (
                    <RobotSquare squareOnClick={that.squareInformation.bind(that)} key={i} squareType={square} styleObj={styleObj} pos_row={that.props.rowIndex} pos_column={i} square_text={design.square_text} robotInfo={that.props.robotInfo}>

                </RobotSquare>
                )

            }
            else if (result  !== null){
                return(
                    <PackageSquare squareOnClick={that.squareInformation.bind(that)} key={i} squareType={square} styleObj={styleObj} pos_row={that.props.rowIndex} pos_column={i} square_text={design.square_text} packageInfo={result}/>
                )
            }

            else {
                return (
                    <Square squareOnClick={that.squareInformation.bind(that)} key={i} squareType={square} styleObj={styleObj} pos_row={that.props.rowIndex} square_text={design.square_text} pos_column={i} >

                    </Square>)
            }
        });
        return (
            <div className="rowContainer">
            {manySquares}
            </div>
        )

    }

}
export default Row
