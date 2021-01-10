import axios from 'axios'

const baseUrl = 'http://localhost:3001/tasks'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const updateTask = async (task) => {
    const response = await axios.put(`${baseUrl}/${task.id}`, task)
    return response.data
}

const taskService = {
    getAll,
    updateTask
}

export default taskService