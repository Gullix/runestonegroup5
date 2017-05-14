import React, { Component } from 'react';
require('./TabWindow.css');
class Tab extends Component{
    constructor(props){
        super(props)
        this.state ={
            selected: false,
            lol:"hejsan",
            tabIndex: props.tabIndexInit,
            integer: 1337

        };
    }

    showTabInfo(){
        console.log("show tab info " + this.props["data-tabTitle"] + this.state.lol)
            this.setState({
                selected: true,
                lol: "svejsan"
            })


    }
    onTabClick(){
        this.props.changeTab(this.state.tabIndex)
    }


    render(){

        return(
            <div className="tab" data-lol={this.state.lol} data-value={this.props["data-value"]} data-tabTitle={this.props["data-tabTitle"]} onClick={this.onTabClick.bind(this)}>

                {this.props["data-tabTitle"]}

            </div>

        )
    }
}
export default Tab
