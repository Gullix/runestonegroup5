/**
 * Created by simonljus on 2017-05-21.
 */
import React, { Component } from 'react';
require('./Grid.css');
class Square extends Component{
    setColor(){
        var squareColor = "white";
        switch(this.props.squareType){

            case("b"):
                squareColor = "white"
                break;
            case("z"):
                squareColor = "purple"
                break;
            case("i"):
                squareColor= "robotbob.svg"
                break;
            case("l"):
                squareColor= "blue"
                break;
            case("s"):
                squareColor= "green"
                break;
            case("e"):
                squareColor= "red"
                break;
            default:
                squareColor = "white"
                break;
        }
        return  squareColor;
    }
    render(){
        var styleObj = {
            backgroundColor: this.setColor()
        }
        if(this.props.robotPos.position.row === this.props.pos_row && this.props.robotPos.position.col === this.props.pos_col ){
            var degrees = 0;
            console.log(this.props.robotPos);
            switch(this.props.robotPos.orientation){
                case("north"):
                    degrees=180;
                    break;
                case("south"):
                    degrees=0;
                    break;
                case("west"):
                    degrees=90;
                    break;
                case("east"):
                    degrees=270;
                    break;
                default:
                    degrees =0;
                 break;
            }
            var backStr = "../public/robotbob.svg";
            styleObj = {

                backgroundColor: this.setColor(),
                WebkitTransform: 'rotate('+degrees+'deg)',
                MozTransform: 'rotate('+degrees+'deg)',
                msTransform: 'rotate('+degrees+'deg)',
                OTransform: 'rotate('+degrees+'deg)',
                transform : 'rotate('+degrees+'deg)',
            }



            console.log(styleObj);
            return(
                <div className="squareContainer robotBob" style={styleObj} >

                </div>

            )
        }
        else{
            return(
                <div className="squareContainer" style={styleObj}>


                </div>

            )
        }

    }
}
export default Square
