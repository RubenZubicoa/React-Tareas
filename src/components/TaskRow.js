import React from 'react';

export const TaskRow = props => {

    const deleteTask = () => {
        props.deleteTask(props.task)
    }

    return (
        <tr key={props.task.name}>
        <td>{props.task.name}</td>
        <td>
            <input 
                type="checkbox" 
                onChange={() => props.toggleTask(props.task)} 
                checked={props.task.done} 
            />
        </td>
        <td>
            <button className="btn btn-large btn-danger" onClick={deleteTask}>Delete</button>
        </td>
    </tr>
    )
}