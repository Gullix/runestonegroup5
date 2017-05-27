import React, { Component } from 'react';
require('./InformationOverview.css');
import SquareInformationWindow from "./SquareInformationWindow";
import PackageInformationWindow from "./PackageInformationWindow";
import RobotInformationWindow   from "./RobotInformationWindow";
class InformationOverview extends Component{
    render(){
        return(
            <div className="informationOverviewContainer">
            <SquareInformationWindow/>
            <PackageInformationWindow/>
            <RobotInformationWindow/>
            </div>

        )
    }
}
export default InformationOverview
