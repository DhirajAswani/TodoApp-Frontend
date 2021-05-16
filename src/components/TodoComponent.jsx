import React,{Component} from 'react'
import moment from 'moment'
import { Field, Formik, Form, ErrorMessage } from 'formik'
import TodoDataService from '../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'


export default class TodoComponent extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            id: this.props.match.params.id, description:'', targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this)
        
        
    }

    componentDidMount() {

        if(this.state.id === -1) {
            return 
        }

        let username = AuthenticationService.getLoggedInUser()
        TodoDataService.retrieveTodo(username, this.state.id)
        .then(response => this.setState({
            description: response.data.description,
            targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
        }
        ))
    }

    onSubmit(values){
        console.log(values)

        if(this.state.id === -1) {

            let username = AuthenticationService.getLoggedInUser()

            TodoDataService.createTodo(username,
             {id: this.state.id, description: values.description, targetDate: values.targetDate})
             .then(() => this.props.history.push("/todos")) 
        }

        let username = AuthenticationService.getLoggedInUser()

        TodoDataService.updateTodo(username, this.state.id,
             {id: this.state.id, description: values.description, targetDate: values.targetDate})
             .then(() => this.props.history.push("/todos")) 

    }

    validate(values) {

        let errors = {}

        if(!values.description) {
            errors.description = 'Enter a Description'
        }
        else if(values.description.length<5) {
            errors.description = 'Enter atleast 5 char in desc'
        }

        if(!moment(values.targetDate).isValid())
        {
            errors.targetDate = 'Enter a valid Target date'
        }

        return errors
    }

    render() {

        let description = this.state.description;
        let targetDate = this.state.targetDate;

        // We can write above mentioned state variables by using destructuring show below
        // let {description,targetDate} = this.state; 

        return (
            <div className="container">
                <h1>Todo</h1>
                <div className="container">
                    {/* We enter 2 opening and closing curly braces, first brace indicating javascript and second one indicating js object */}
                    
                    <Formik 
                    
                        initialValues={{
                            description: description,
                            targetDate: targetDate

                            // When we have key and value with same name in js then we can declare only key, so for above code it will look like
                            // description, targetDate
                        }}
                        
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        validateOnChange={false}
                        validateOnBlur={false}
                        enableReinitialize={true}

                    >

                        {/* we need to define entire method insider formik which would return entire form */}
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Submit</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }


}