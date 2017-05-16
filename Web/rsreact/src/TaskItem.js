import React, { Component } from 'react';
require('./TaskItem.css');
class TaskItem extends Component{
    constructor(props){
        super(props);
        this.state({
          task: this.props.task
        });
    }
    render(){
        return(
            <div className="TaskItemContainer">
                <div className="TaskItemText"></div>
                <button className="cancelButton">X</button>
            </div>

        )
    }
}
export default TaskItem
