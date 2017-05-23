import React, { Component } from 'react';
require('./TaskItem.css');
class TaskItem extends Component{
    render(){
        console.log(this.props.task)
        return(

            <div className="TaskItemContainer">
                <p className="TaskItemText">{this.props.task}</p>
                <button className="cancelButton pull-right">X</button>
            </div>

        )
    }
}
export default TaskItem
