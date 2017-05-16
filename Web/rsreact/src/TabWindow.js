/**
 * Created by simonljus on 2017-05-11.
 */
import React, { Component } from 'react';
import InstructionWindowTemp from "./InstructionWindowTemp";
import Tab from "./Tab";
require('./TabWindow.css');
class TabWindow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabMode: 0,
            bckColor: "red",
            option1: ["package1","package2"],
            option2: ["area5", "area6"]

   };
    }
    renderTab(i,tabTit){
        return (<Tab data-value={i}  data-tabTitle={tabTit}  tabIndexInit={i} changeTab={this.changeTabContent.bind(this)}/>);
        }

        renderInstructionWindow(){
        return(
                 <InstructionWindowTemp />
        )
    }

    renderTabs() {
    }
    changeTabContent(tabID){
            var op1 = this.state.option1;
            var op2 = this.state.option2;
            if(tabID===0){
                op1 = ["package1","package2"];
                op2 = ["area5","area6"];

            }
            else if(tabID===1)  {
                  op1 = ["area1","area22"];
                  op2 = ["area3","area4"];
            }
            else{

            }
              this.setState({
                tabMode:  tabID,
                option1:  op1,
                option2: op2,

        });


    }




    openTab(props) {
        this.setState({


            tabMode: props.value
        });
    }


    fillTabContent(){

             return(


                      <InstructionWindowTemp op1Init={this.state.option1} op2Init={this.state.option2}data-tabMode={this.state.tabMode}/>


             )
}
         handleChange(event){
         this.setState({

                     tabMode:event.target.value,
                     bckColor: "blue"
                 });

         }

         sendCommand(message){
             this.props.wsSend(message);
         }

        
        
        
    render()
    {
             /*
            const linkStyle ={
               backgroundColor:this.state.bckColor
        }
        */

        return(
            <div className="TabWindowContainer">
                <div className="tabsContainer" >
                {this.renderTab(0, "Move Package") }

                {this.renderTab(1, "Move from/to Location")    }
                </div>
                <div id="testid" className="tabContent">
                        <InstructionWindowTemp op1Init={this.state.option1} op2Init={this.state.option2}data-tabMode={this.state.tabMode} selCommand={this.sendCommand.bind(this)}/>



                </div>
            </div>


        )
    }
}
export default TabWindow