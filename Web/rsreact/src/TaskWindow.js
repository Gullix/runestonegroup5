import React, { Component } from 'react';
import TaskItem from "./TaskItem";
require('./TaskWindow.css');
class TaskWindow extends Component {

    render() {
             console.log(this.props.tlMessage);
        if (this.props.tlMessage !== "") {
                   console.log("inte null");

            return (
                <div className="TaskWindowContainer">
                    {
                        this.props.tlMessage.map((task, i) => <TaskItem key={i} value={task.task_id}
                                                                        task={task.args}>

                        </TaskItem>)}
                </div>

            )
        }
        else {

            return (
                <div className="TaskWindowContainer"> </div>

            )

        }
    }
}
export default TaskWindow
