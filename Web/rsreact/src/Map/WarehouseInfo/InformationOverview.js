import React, { Component } from 'react';
require('./InformationOverview.css');
import InformationWindow from "./InformationWindow";

class InformationOverview extends Component{
    render(){
        return(
            <div className="informationOverviewContainer">
            <InformationWindow squareClicked={this.props.squareClicked}/>
            </div>

        )
    }
}
export default InformationOverview
