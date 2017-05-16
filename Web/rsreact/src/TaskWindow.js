import React, { Component } from 'react';
require('./TaskWindow.css');
class TaskWindow extends Component{
    constructor(){
        super();

        this.state({
          tasks: this.props.tasks
        });
    }


    render(){

        return(
            <div className="TaskWindowContainer">
                {this.state.tasks.map((task,i) => <TaskItem key={i}  value={task.taskID} task={this.state.tasks}>

                </TaskItem>)}
            </div>

        )
    }
}
export default TaskWindow
