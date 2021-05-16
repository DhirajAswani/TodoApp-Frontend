import axios from 'axios'
import {API_URL, JPA_API_URL} from '../../../src/constants.js'

class TodoDataService {

    retrieveAllUsers(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/todos`)
    }

    deleteTodo(name, id) {
        return axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`)
    }

    retrieveTodo(name, id) {
        return axios.get(`${JPA_API_URL}/users/${name}/todos/${id}`)
    }

    updateTodo(name, id, todo) {
        return axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo)
    }

    createTodo(name, todo) {
        return axios.post(`${JPA_API_URL}/users/${name}/todos/`, todo)
    }
}

export default new TodoDataService();