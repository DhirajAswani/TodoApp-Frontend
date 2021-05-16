import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import HelloWorldService from '../api/todo/HelloWorldService.js'



class WelcomeComponent extends Component {

    constructor(props) {
        super(props)
        this.fetchMessage = this.fetchMessage.bind(this)
        
        this.state = {
            welcomeMessage : ''
        }
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }


    fetchMessage() {
        HelloWorldService.executeHelloWorldServiceWithParam(this.props.match.params.name)
        .then(response => this.handleSuccessfulResponse(response))
        .catch(error => this.handleError(error))
    }
    

    handleSuccessfulResponse(response) {
        this.setState({welcomeMessage : response.data})
    }

    handleError(error) {
        console.log(error)

        let errorMessage = '';

        if(error.message) {
            errorMessage += error.message
        }

        if(error.response && error.response.data) {
            errorMessage += error.response.data.message
        }

        this.setState({welcomeMessage:errorMessage})
    }

    render() {
        return (
            <div className="container">
                <h1>Welcome!  {this.props.match.params.name}.</h1>
                You can manage your todos <Link to="/todos">here</Link>

                <div>Click here to fetch response from backend Api <button className="btn btn-success" onClick={this.fetchMessage}>Fetch Api</button></div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </div>
        );
    }
}



export default WelcomeComponent;