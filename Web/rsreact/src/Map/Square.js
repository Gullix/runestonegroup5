/**
 * Created by simonljus on 2017-05-21.
 */
import React, { Component } from 'react';
require('./Grid.css');
import Robot from "./Robot";
import Package from "./Package";
class Square extends Component{
    setDesign(){
        var square_color = "white";
        var square_text = "";
        var square_id = this.props.squareType;
        switch(this.props.squareType.charAt(0)){

            case("b"):
                square_color = "white"
                break;
            case("z"):
                square_color = "purple"
                square_text= square_id
                break;
            case("i"):
                square_color= "robotbob.svg"
                square_text= square_id;
                break;
            case("l"):
                square_color= "blue"
                break;
            case("s"):
                square_color= "green"
                square_text= square_id
                break;
            case("e"):
                square_color= "red"
                square_text= square_id
                break;
            default:
                square_color = "white"
                break;
        }
        return  {
            square_color: square_color,
            square_text: square_text,
        };
    }
    render(){
        const design =this.setDesign();
        var styleObj = {
            backgroundColor: design.square_color,
        }
        var that= this;
        if(this.props.robotInfo.position.row === this.props.pos_row && this.props.robotInfo.position.column === this.props.pos_column ){
            return(
                <div className="squareContainer robotBob" style={styleObj} >
                     <a className="squareText">{design.square_text}</a>
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
                    <div className="squareText">{design.square_text}</div>
                    {packageCheck}
                </div>

            )
        }

    }
}
export default Square
