import { React, useState, useEffect } from 'react'
import categoryService from './services/categoryService'
import taskService from './services/taskService'
import TaskList from './components/TaskList'

const App = () => {
    const [ categories, setCategories ] = useState([])
    const [ tasks, setTasks ] = useState([])

    useEffect(() => {
        const getCategoryData = async () => {
            const categoryData = await categoryService.getAll()
            setCategories(categoryData)
        }

        const getTaskData = async () => {
            const taskData = await taskService.getAll()
            setTasks(taskData)
        }

        getCategoryData()
        getTaskData()
    }, [])

    const handleDrop = (event) => {
      event.preventDefault()

      const srcTaskId = parseInt(event.dataTransfer.getData('SrcTaskId'))
      const srcTaskIndex = tasks.findIndex(task => task.id === srcTaskId)
      const srcTask = tasks[srcTaskIndex]

      const destTaskData = event.target.getAttribute('id').split('_')

      if (destTaskData.length === 2) {
        srcTask.status = destTaskData[1]
        setTasks([].concat(tasks))
      } else {
        const destTaskId = parseInt(destTaskData[2])
        const destTaskIndex = tasks.findIndex(task => task.id === destTaskId)
        const destTask = tasks[destTaskIndex]
        console.log(destTask)

        srcTask.status = destTask.status
        const newTaskArray = [].concat(tasks)
        newTaskArray.splice(srcTaskIndex, 1)
        
        if (destTaskData[0] === 'over') {
          newTaskArray.splice(destTaskIndex, 0, srcTask)
        } else if (destTaskData[0] === 'under') {
          newTaskArray.splice(destTaskIndex + 1, 0, srcTask)
        }

        setTasks(newTaskArray)
      }
    }

    return (
      <div className="container">
        <h1 className="text-center">TaskList</h1>
        <TaskList handleDrop={handleDrop} categories={categories} tasks={tasks} />
      </div>
    )
}

export default App