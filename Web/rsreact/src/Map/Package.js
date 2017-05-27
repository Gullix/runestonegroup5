import React, { Component } from 'react';
require('./Grid.css');
class Package extends Component{

    plsHello(){
        console.log(this.props.packageInfo)
    }
    render(){
        var styleObj = {
            backgroundImage : "url('package.svg')",
        }
        return(
            <div className="packageContainer" style={styleObj}  >

            </div>

        )
    }
}
export default Package
