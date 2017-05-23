import React, { Component } from 'react';
require('./TaskItem.css');
class TaskItem extends Component{
    render(){
        return(

            <div className="TaskItemContainer">
                <p className="TaskItemText">{this.props.task}</p>
                <button className="cancelButton pull-right">X</button>
            </div>

        )
    }
}
export default TaskItem
