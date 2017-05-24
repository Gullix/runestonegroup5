/**
 * Created by simonljus on 2017-05-11.
 */
import React, { Component } from 'react';
import InstructionWindow from "./InstructionWindow";
import Tab from "./Tab";
require('./TabWindow.css');
import PropTypes from 'prop-types';
class TabWindow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabMode: 0,
            packageList: props.plMessage,
            areaList: ["area5", "area6"],
            mapStateList: this.listMapStates()

   };
    }
    // Render a tab with value i  and title tabTit
    renderTab(i,tabTit){
        return (<Tab data-value={i}  data-tabTitle={tabTit}  tabIndexInit={i} changeTab={this.changeTabContent.bind(this)}/>);
        }
    changeTabContent(tabID) {
        if (tabID !== null && tabID !== this.state.tabMode) {
            this.setState({
                tabMode: tabID,

            });


        }
    }
    listMapStates(){
        var mapStates = this.props.mapStates;
        var mapStateList=[];
        for( var i =0; i < mapStates.length; i++ ){
            var pos =mapStates[i].position;
            mapStateList.push("row: " + pos.row + ",column" + pos.column);
        }
        return mapStateList;
    }
    changedOptions(){
    }

         sendCommand(message){
             this.props.wsSend(message);
         }
         renderInstructionWindow(){

             switch(this.state.tabMode){
                 case(0):
                     console.log(this.props)
                     return(
                     <InstructionWindow optionAInit={this.props.packages} optionBInit={this.props.m_zones}  tab={0} changeOptions={this.changedOptions.bind(this)} selCommand={this.sendCommand.bind(this)}/>
                     )
                 case(1):
                     console.log(this.props)
                     return(
                     <InstructionWindow optionAInit={this.props.m_zones} optionBInit={this.props.m_zones} tab={1} changeOptions={this.changedOptions.bind(this)} selCommand={this.sendCommand.bind(this)}/>
                     )
                 case(2):
                     return(
                         <InstructionWindow optionAInit={this.props.m_states} tab={2} changeOptions={this.changedOptions.bind(this)} selCommand={this.sendCommand.bind(this)}/>
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

                {this.renderTab(1, "New storage location")    }
                {this.renderTab(2,"New position")}
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