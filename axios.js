import axios from 'axios'

const instance = axios.create({
baseURL: 'https://todo-ytu.herokuapp.com/api/'
})

export default instance
