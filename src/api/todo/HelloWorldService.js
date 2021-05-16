import axios from 'axios';

class HelloWorldService {

    executeHelloWorldService() {
        console.log("executeHelloWorldService");
        return axios.get('http://localhost:8081/hello'); 
    }

    executeHelloWorldServiceWithParam(name) {
        console.log("executeHelloWorldService");
        return axios.get(`http://localhost:8081/hello-world/path-variable/${name}`); 
    }

}

export default new HelloWorldService()