import React from 'react'
import { Table } from 'react-bootstrap'
import Task from './Task'

const TaskList = ({categories, tasks, handleDrop}) => {
    const categoryHeaders = () => categories.map(category => <th key={category.id}>{category.name}</th>)
    const addTasksToCategories = () => {
        const tasksInCategories = {}
        
        categories.forEach(category => {
            tasksInCategories[category.name] = []

            tasks.forEach(task => {
                if (task.status === category.name) {
                    tasksInCategories[category.name].push(task)
                }
            })
        })
        console.log(tasksInCategories)
        return tasksInCategories
    }
    
    const getNumOfTasksInCategoryWithMostTasks = (tasksInCategories) => {
        return Object.keys(tasksInCategories).reduce((currentMostTasks, currentCategory) => {
            return tasksInCategories[currentCategory].length > currentMostTasks 
                ? tasksInCategories[currentCategory].length 
                : currentMostTasks
        }, 0)
    }

    const taskTable = () => {
        const tasksInCategories = addTasksToCategories()
        const numOfTasks = getNumOfTasksInCategoryWithMostTasks(tasksInCategories)
        const taskRows = []

        for (let i = 0; i < numOfTasks; i++) {
            const taskRowElements = []
            let taskIds = ""

            categories.forEach(category => {
                const task = i < tasksInCategories[category.name].length 
                    ? tasksInCategories[category.name][i]
                    : null

                const taskId = task !== null
                    ? task.id
                    : `null_element_${category.id}`

                taskIds += taskId

                taskRowElements.push(<Task handleDrop={handleDrop} key={taskId} task={task} category={category} />)
            })

            taskRows.push(<tr key={taskIds}>{taskRowElements}</tr>)
        }

        return taskRows
    }

    return (
        <Table striped>
            <thead>
                <tr>
                    {categoryHeaders()}
                </tr>
            </thead>
            <tbody>
                {taskTable()}
            </tbody>
        </Table>
    )
}

export default TaskList