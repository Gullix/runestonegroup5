/**
 * Created by simonljus on 2017-05-11.
 */
import React, { Component } from 'react';
import InstructionWindowTemp from "./InstructionWindowTemp";
import Tab from "./Tab";
require('./TabWindow.css');
import PropTypes from 'prop-types';
class TabWindow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabMode: 0,
            optionA: ["package1","package2"],
            optionB: ["area5", "area6"]

   };
    }
    // Render a tab with value i  and title tabTit
    renderTab(i,tabTit){
        return (<Tab data-value={i}  data-tabTitle={tabTit}  tabIndexInit={i} changeTab={this.changeTabContent.bind(this)}/>);
        }
    changeTabContent(tabID){
            if(tabID===0){
                this.setState({
                    tabMode:  tabID,
                    optionA:  ["package1","package2"],
                    optionB: ["area5","area6"],

                });

            }
            else if(tabID===1)  {
                this.setState({
                    tabMode:  tabID,
                    optionA:  ["area1","area22"],
                    optionB: ["area3","area4"],

                });
            }
            else{

            }



    }

         sendCommand(message){
             this.props.wsSend(message);
         }

        
        
        
    render()
    {
        return(
            <div className="TabWindowContainer">
                <div className="tabsContainer" >
                {this.renderTab(0, "Move Package") }

                {this.renderTab(1, "Move from/to Location")    }
                </div>
                <div id="testid" className="tabContent">
                        <InstructionWindowTemp optionAInit={this.state.optionA} optionBInit={this.state.optionB} selCommand={this.sendCommand.bind(this)}/>



                </div>
            </div>


        )
    }
}
export default TabWindow
TabWindow.propTypes={
    wsSend: PropTypes.func,
}