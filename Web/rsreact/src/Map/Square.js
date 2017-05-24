/**
 * Created by simonljus on 2017-05-21.
 */
import React, { Component } from 'react';
require('./Grid.css');
import Robot from "./Robot";
import Package from "./Package";
class Square extends Component{
    setColor(){
        var squareColor = "white";
        switch(this.props.squareType.charAt(0)){

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
        var that= this;
        if(this.props.robotInfo.position.row === this.props.pos_row && this.props.robotInfo.position.column === this.props.pos_column ){
            return(
                <div className="squareContainer robotBob" style={styleObj} >
                     <Robot robotInfo={this.props.robotInfo}> </Robot>
                </div>

            )
        }
        else{
            var packageCheck = this.props.packages.map(function(pack, i) {
                if(pack.position.row === that.props.pos_row && pack.position.column === that.props.pos_column){
                    return(
                        <Package packageInfo={pack} key={i}></Package>
                    )
                }
                else{
                    return(null)
                }

            });
            return(
                <div className="squareContainer" style={styleObj}>
                    {packageCheck}
                </div>

            )
        }

    }
}
export default Square
