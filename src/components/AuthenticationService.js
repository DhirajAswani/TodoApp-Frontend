import axios from 'axios'
import {API_URL} from '../constants.js'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

    createBasicAuthToken(username, password) {
        let basicAuthHeader = 'Basic '+ window.btoa(username + ":" + password)
        return basicAuthHeader
    }

    createJwtAuthToken(token){
        return 'Bearer ' + token
    }

    executeBasicAuthService(username, password) {
        return axios.get(`${API_URL}/basicauth`, 
        {headers : {authorization: this.createBasicAuthToken(username,password)}})
    }

    executeJwtAuthService(username, password) {
        return axios.post(`${API_URL}/authenticate`, {username, password})
    }

    registerSuccessfulLogin(username,password){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setUpAxiosInterceptors(this.createBasicAuthToken(username,password))
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setUpAxiosInterceptors(this.createJwtAuthToken(token))
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)

        if(user){
            return true
        }
        else
        {
            return false
        }
    }

    getLoggedInUser() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user){
            return user
        }
        else
        {
            return ""
        }
    }

    setUpAxiosInterceptors(basicAuthHeader) {

            axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()) {
                config.headers.authorization = basicAuthHeader

            }

            return config
        }
        )
    }

    
}

export default new AuthenticationService()