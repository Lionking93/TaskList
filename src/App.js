import { React, useState, useEffect } from 'react'
import categoryService from './services/categoryService'
import taskService from './services/taskService'
import TaskList from './components/TaskList'

const App = () => {
    const [ categories, setCategories ] = useState([])
    const [ tasks, setTasks ] = useState([])

  const getCategoryData = async () => {
    const categoryData = await categoryService.getAll()
    setCategories(categoryData)
  }

  const getTaskData = async () => {
    const taskData = await taskService.getAll()
    setTasks(taskData)
  }

  const updateTasks = async (tasksWithUpdates) => {
    let newTaskArray = []

    for (const task of tasksWithUpdates) {
      const updatedTask = await taskService.updateTask(task)
      newTaskArray.push(updatedTask)
    }

    newTaskArray = newTaskArray.concat(tasks.filter(task => !newTaskArray.map(nTask => nTask.id).includes(task.id)))
    setTasks(newTaskArray)
  } 

  useEffect(() => {
      getCategoryData()
      getTaskData()
  }, [])

  const handleDrop = (event) => {
    event.preventDefault()

    const srcTaskId = parseInt(event.dataTransfer.getData('text/plain'))
    const srcTaskIndex = tasks.findIndex(task => task.id === srcTaskId)
    const srcTask = tasks[srcTaskIndex]

    const destTaskData = event.currentTarget.getAttribute('id').split('_')
    let destTaskId = destTaskData[0]
    const destTaskCategory = destTaskData[1]

    // Task is put to empty table cell
    if (destTaskId.startsWith('null')) {
      const destTaskIndex = [].concat(tasks).reverse().findIndex(task => task.status === destTaskCategory)

      srcTask.status = destTaskCategory

      if (destTaskIndex === -1) {
        // No other tasks in new category. Enough to update srcTask status
        updateTasks([ srcTask] )
      } else {
        // Other tasks in new category. Need to find last task in current category and set sort order so that src task
        // will be after last task in current category
        const destTask = tasks[tasks.length - 1 - destTaskIndex]

        const smallerSortId = srcTask.sortId < destTask.sortId ? srcTask.sortId : destTask.sortId
        const higherSortId = srcTask.sortId >= destTask.sortId ? srcTask.sortId : destTask.sortId

        srcTask.sortId = higherSortId
        destTask.sortId = smallerSortId

        updateTasks([ srcTask, destTask ])
      }
    } else {
      // Src task put on top of another task
      destTaskId = parseInt(destTaskId)

      // Don't do anything if src task location not changed (this is case where destTaskId === srcTaskId)
      if (destTaskId !== srcTaskId) {
        const destTaskIndex = tasks.findIndex(task => task.id === destTaskId)
        const destTask = tasks[destTaskIndex]

        // Change task order if category is same
        if (srcTask.status === destTask.status) {
          const tempSrcTaskSortId = srcTask.sortId
          srcTask.sortId = destTask.sortId
          destTask.sortId = tempSrcTaskSortId
        } else {
          // If task put to different category, make sure that task ends up on top
          const smallerSortId = srcTask.sortId < destTask.sortId ? srcTask.sortId : destTask.sortId
          const higherSortId = srcTask.sortId >= destTask.sortId ? srcTask.sortId : destTask.sortId

          srcTask.sortId = smallerSortId
          destTask.sortId = higherSortId
        }

        srcTask.status = destTask.status

        updateTasks([ srcTask, destTask ])
      }
    }
  }

  return (
    <div className="container">
      <h1 className="text-center text-light">TaskList</h1>
      <TaskList handleDrop={handleDrop} categories={categories} tasks={tasks} />
    </div>
  )
}

export default App