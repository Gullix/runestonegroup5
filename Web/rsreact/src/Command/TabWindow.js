/**
 * Created by simonljus on 2017-05-11.
 */
import React, { Component } from 'react';
import MovePackageCommandWindow from "./MovePackageCommandWindow";
import Tab from "./Tab";
import NewPositionCommandWindow from "./NewPositionCommandWindow";
import NewPackageCommandWindow from "./NewPackageCommandWindow";
import ExtractPackageCommandWindow from "./ExtractPackageCommandWindow";
require('./TabWindow.css');
import PropTypes from 'prop-types';
class TabWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabMode: 0,
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
    changedOptions(){
    }

         sendCommand(message){
             this.props.wsSend(message);
         }
         renderInstructionWindow(){

             switch(this.state.tabMode){
                 case(0):
                     return(
                        <MovePackageCommandWindow packageOption={this.props.packages} storageOption={this.props.m_zones}  tab={0} changeOptions={this.changedOptions.bind(this)} sendCommand={this.sendCommand.bind(this)}/>
                     );
                 case(1):
                     return(
                         <NewPositionCommandWindow positionOption={this.props.m_states} tab={1} changeOptions={this.changedOptions.bind(this)} sendCommand={this.sendCommand.bind(this)}/>
                     );
                 case(2):
                     return(
                        <NewPackageCommandWindow   pickupOption={this.props.m_deliver_zones} tab={2} sendCommand={this.sendCommand.bind(this)} />
                     );
                 case(3):
                     return(
                         <ExtractPackageCommandWindow packageOption={this.props.packages} storageOption={this.props.m_deliver_zones}  tab={3} changeOptions={this.changedOptions.bind(this)} sendCommand={this.sendCommand.bind(this)}/>
                     );
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
                    {this.renderTab(1,"New position")}
                    {this.renderTab(2,"New package")}
                    {this.renderTab(3,"Extract package")}
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