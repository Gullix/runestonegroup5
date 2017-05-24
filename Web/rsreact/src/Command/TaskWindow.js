import React, { Component } from 'react';
import TaskItem from "./TaskItem";
require('./TaskWindow.css');
class TaskWindow extends Component {

    render() {
        if (this.props.tlMessage !== "") {

            return (
                <div className="TaskWindowContainer">
                    {
                        this.props.task_list.map((task, i) => <TaskItem key={i} value={task.task_id}
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
