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
            packageList: props.plMessage,
            areaList: ["area5", "area6"]

   };
    }
    // Render a tab with value i  and title tabTit
    renderTab(i,tabTit){
        return (<Tab data-value={i}  data-tabTitle={tabTit}  tabIndexInit={i} changeTab={this.changeTabContent.bind(this)}/>);
        }
    changeTabContent(tabID) {
        if (tabID !== null && tabID != this.state.tabMode) {
            this.setState({
                tabMode: tabID,

            });


        }
    }

         sendCommand(message){
             this.props.wsSend(message);
         }
         renderInstructionWindow(){
             switch(this.state.tabMode){
                 case(0):
                     return(
                     <InstructionWindowTemp optionAInit={this.props.plMessage} optionBInit={this.state.areaList} selCommand={this.sendCommand.bind(this)}/>
                     )
                 case(1):
                     return(
                     <InstructionWindowTemp optionAInit={this.state.areaList} optionBInit={this.state.areaList} selCommand={this.sendCommand.bind(this)}/>
                     )
                 default:
                     break;
             }
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

                    {this.renderInstructionWindow()}




                </div>
            </div>


        )
    }
}
export default TabWindow
TabWindow.propTypes={
    wsSend: PropTypes.func,
}