import React,{Component} from 'react'
import AuthenticationService from './AuthenticationService.js'



function ShowInvalidCredentials(props) {
    if(props.hasLoginfailed) {
        return <div className="alert alert-warning">Invalid Credentials</div>
    }
    
    return null
}

function ShowLoginSuccessMessage(props) {
    if(props.showLoginSuccessMessage){
        return <div>Login Success</div>
    }
    return null
}

class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            hasLoginfailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        // console.log(event.target.value);
        // console.log(event.target.name);
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    loginClicked() {
        // username = dhiraj password = dhiraj <= hard coded
        
        // console.log(this.state)

        // AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        // if(this.state.username === "dhiraj" && this.state.password === "dhiraj") {
        //     this.props.history.push(`/welcome/${this.state.username}`)
        //     console.log("Success")
        //     this.setState({showSuccessMessage: true})
        // }
        // else
        // {
        //     console.log("Login Failed")
        //     this.setState({showSuccessMessage: false})
        //     this.setState({hasLoginfailed: true})
        // }

        // ***************************
        // BASIC AUTH
        // ***************************

        // AuthenticationService.executeBasicAuthService(this.state.username, this.state.password)
        // .then(
        //     () => {
        //         AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        //         this.props.history.push(`/welcome/${this.state.username}`)
        //         console.log("Success")
        //         this.setState({showSuccessMessage: true})
        //     }
        // )
        // .catch(
        //     () => {
        //         console.log("Login Failed")
        //         this.setState({showSuccessMessage: false})
        //         this.setState({hasLoginfailed: true})
        //     }
        // )


        AuthenticationService.executeJwtAuthService(this.state.username, this.state.password)
        .then(
            (response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                this.props.history.push(`/welcome/${this.state.username}`)
                console.log("Success")
                this.setState({showSuccessMessage: true})
            }
        )
        .catch(
            () => {
                console.log("Login Failed")
                this.setState({showSuccessMessage: false})
                this.setState({hasLoginfailed: true})
            }
        )
    }


    render() {
        return(
            <div className="container">
                <h1>Login</h1>
                <ShowInvalidCredentials hasLoginfailed={this.state.hasLoginfailed} />
                <ShowLoginSuccessMessage showLoginSuccessMessage ={this.state.showSuccessMessage} />
                <div>
                    Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                </div>
                <br></br>
                <div>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                </div>
                <br></br>
                <div>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}

export default LoginComponent