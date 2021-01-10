import React from 'react'
import '../stylesheets/task.css'

const Task = ({ task, handleDrop }) => {
    let taskContents = ""

    const dragStart = (event) => {
        event.dataTransfer.setData('text/plain', task.id)
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setDragImage(event.target, 0, 0)
    }

    const dragLeave = (event) => {
        event.currentTarget.removeAttribute('drop-active')
    }

    const dragOver = (event) => {
        event.preventDefault()
        event.currentTarget.setAttribute('drop-active', true)
        event.dataTransfer.dropEffect = "move"
    }

    const dragDrop = (event) => {
        event.currentTarget.removeAttribute('drop-active')
        handleDrop(event)
    }

    if (!task.id.toString().startsWith('null')) {
        taskContents =
            <div>
                <div>
                    <b>Name:</b> {task.name}
                </div>
                <div>
                    <b>Estimated completion time (hrs):</b> {task.estimatedCompletionTime}
                </div>
                <div>
                    <b>Time spent (hrs):</b> {task.timeSpentOnCompletion}
                </div>
                <div>
                    <b>Assigned to:</b> {task.assignedTo}
                </div>
            </div>
    }

    return (
        <td id={`${task.id}_${task.status}`} className='drop-over' draggable='true' onDragLeave={dragLeave} onDragOver={dragOver} onDrop={dragDrop} onDragStart={dragStart}>
            {taskContents}
        </td>
    )
}

export default Task