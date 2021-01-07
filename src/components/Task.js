import React from 'react'

const Task = ({ task, handleDrop, category }) => {
    let taskContents = ""

    const dragStart = (event) => {
        event.dataTransfer.setData('SrcTaskId', task.id)
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setDragImage(event.target, 0, 0)
    }

    const dragOver = (event) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = "move"
    }

    const dragDrop = (event) => {
        handleDrop(event)
    }

    if (task !== null) {
        taskContents =
        <div>
            <div id={`over_id_${task.id}`} onDragOver={dragOver} onDrop={dragDrop}>+</div>
            <div id={task.id} draggable='true' onDragStart={dragStart}>
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
            <div id={`under_id_${task.id}`} onDragOver={dragOver} onDrop={dragDrop}>+</div>
        </div>
    } else {
        taskContents = 
        <div>
            <div id={`empty_${category.name}`} onDragOver={dragOver} onDrop={dragDrop}>+</div>
        </div>
    }

    return (
        <td>
            {taskContents}
        </td>
    )
}

export default Task