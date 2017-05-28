import React, { Component } from 'react';
require('./InformationOverview.css');
class InformationWindow extends Component{
    render(){
        if(this.props.squareClicked !== null) {
            console.log(this.props.squareClicked.type_of_square);
            var squareInformation = this.props.squareClicked;
            var squareInformationString;
            switch(squareInformation.type_of_square){
                case("Robot"):
                    squareInformationString = squareInformation.type_of_square + ": " + squareInformation.carrying_package;
                    break;
                case("Package"):
                    squareInformationString = "Package id: " + squareInformation.package_id;
                    break;
                case("Square"):
                    squareInformationString = squareInformation.type_of_square + " ";
                    break;
                default:
                    break;
            }

        }
        return(

            <div className="informationWindowContainer">
                <div>
                    <h3>Information:</h3>
                </div>
                <div>{squareInformationString}
                </div>
            </div>

        )
    }
}
export default InformationWindow
