import React from 'react'
import { Table } from 'react-bootstrap'
import Task from './Task'

const TaskList = ({categories, tasks, handleDrop}) => {
    const sortedTasks = tasks.sort((task1, task2) => task1.sortId - task2.sortId)

    const categoryHeaders = () => categories.map(category => <th key={category.id}>{category.name}</th>)
    const addTasksToCategories = () => {
        const tasksInCategories = {}
        
        // Each task is stored in an array with object key category name
        categories.forEach(category => {
            tasksInCategories[category.name] = []

            sortedTasks.forEach(task => {
                if (task.status === category.name) {
                    tasksInCategories[category.name].push(task)
                }
            })
        })

        return tasksInCategories
    }
    
    // Get the highest array length for object that contains tasks in arrays with category names as object keys
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
                    : { id: `null${category.id}`, status: category.name }

                const taskId = task.id

                taskIds += taskId

                taskRowElements.push(<Task handleDrop={handleDrop} key={taskId} task={task} />)
            })

            taskRows.push(<tr key={taskIds}>{taskRowElements}</tr>)
        }

        return taskRows
    }

    return (
        <Table variant='dark'>
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