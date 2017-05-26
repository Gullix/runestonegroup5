/**
 * Created by simonljus on 2017-05-23.
 */
import React, { Component } from 'react';
require('./Grid.css');
class Robot extends Component{
    render(){
        var imgsource = "robotbob.svg";
        if(this.props.robotInfo.has_package){
            imgsource = "robotbobCarry.svg";

        }
        var degrees = 0;
        switch(this.props.robotInfo.orientation){
            case("north"):
                degrees=270;
                break;
            case("south"):
                degrees=90;
                break;
            case("west"):
                degrees=180;
                break;
            case("east"):
                degrees=0;
                break;
            default:
                degrees =0;
                break;
        }

        var styleObj = {
            backgroundImage : "url(" + imgsource + ")",
            WebkitTransform: 'rotate('+degrees+'deg)',
            MozTransform: 'rotate('+degrees+'deg)',
            msTransform: 'rotate('+degrees+'deg)',
            OTransform: 'rotate('+degrees+'deg)',
            transform : 'rotate('+degrees+'deg)',
        };
        return(
            <div className="robotContainer" style={styleObj}>

            </div>

        )
    }
}
export default Robot