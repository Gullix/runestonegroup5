import React, { Component } from 'react';
require('./Grid.css');
import Package from "./Package"
class PackageSquare extends Component{
    displayInfo(){
        //console.log(this.props.packageInfo.package_id);
        const obj = {
            type_of_square: "Package",
            package_id: this.props.packageInfo.package_id
        };
        this.props.squareOnClick(obj)
    }
    render(){
        return(
            <div className="squareContainer" style={this.props.styleObj} onClick={this.displayInfo.bind(this)}>
                <a className="squareText">{this.props.square_text}</a>
                <Package packageInfo={this.props.packageInfo}> </Package>
            </div>

        )
    }
}
export default PackageSquare