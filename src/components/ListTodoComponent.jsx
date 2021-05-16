import React,{Component} from 'react'
import TodoDataService from '../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'


class ListTodoComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos : [],
            message : null
        }

        this.deleteTodoclicked = this.deleteTodoclicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.updateTodoclicked = this.updateTodoclicked.bind(this)
        this.addTodoclicked = this.addTodoclicked.bind(this)

    }

    componentDidMount() {
        this.refreshTodos();
    }

    deleteTodoclicked(id) {
        let username = AuthenticationService.getLoggedInUser()
        console.log(id + " " + username);
        TodoDataService.deleteTodo(username, id)
        .then(response => {
            this.setState({message : `Delete of Todo ${id} Successfull`});
            this.refreshTodos();
        })
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUser()
        TodoDataService.retrieveAllUsers(username)
        .then(response => {
            console.log(response)
            this.setState({todos: response.data})
        })
    }

    updateTodoclicked(id) {

        console.log("Update "+id)
        this.props.history.push(`/todos/${id}`)
        // let username = AuthenticationService.getLoggedInUser()
        // console.log(id + " " + username);
        // TodoDataService.deleteTodo(username, id)
        // .then(response => {
        //     this.setState({message : `Delete of Todo ${id} Successfull`});
        //     this.refreshTodos();
        // })
    }

    addTodoclicked() {

        console.log("create")
        this.props.history.push(`/todos/-1`)
        // let username = AuthenticationService.getLoggedInUser()
        // console.log(id + " " + username);
        // TodoDataService.deleteTodo(username, id)
        // .then(response => {
        //     this.setState({message : `Delete of Todo ${id} Successfull`});
        //     this.refreshTodos();
        // })
    }


    render() {
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message && <h2 className="alert alert-success">{this.state.message}</h2>}
                <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Description</th>
                            <th>Target Date</th>
                            <th>Is Completed?</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map(
                                todo =>
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td><button className="btn btn-warning" onClick={() => this.deleteTodoclicked(todo.id)}>Delete</button></td>
                                    <td><button className="btn btn-success" onClick={() => this.updateTodoclicked(todo.id)}>Update</button></td>
                                </tr> 
                            )
                        
                        }       
                    </tbody>
                </table>
                <div className="row">
                    <button className="btn btn-success" onClick={() => this.addTodoclicked()}>Add</button>
                </div>
                </div>
            </div>
        )
    }
}

export default ListTodoComponent;