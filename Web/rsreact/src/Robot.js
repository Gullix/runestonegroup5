/**
 * Created by simonljus on 2017-05-23.
 */
import React, { Component } from 'react';
require('./Grid.css');
class Robot extends Component{
    render(){
        var imgsource = "../public/robotbob.svg";
        if(this.props.robotInfo.has_package){
            imgsource = "../public/robotbobCarry.svg";
        }
        var degrees = 0;
        console.log(this.props.robotPos);
        switch(this.props.robotInfo.orientation){
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

        var styleObj = {
            backgroundImage : "url('robotbob.svg')",
            WebkitTransform: 'rotate('+degrees+'deg)',
            MozTransform: 'rotate('+degrees+'deg)',
            msTransform: 'rotate('+degrees+'deg)',
            OTransform: 'rotate('+degrees+'deg)',
            transform : 'rotate('+degrees+'deg)',
        }
        return(
            <div className="robotContainer" style={styleObj}>

            </div>

        )
    }
}
export default Robot