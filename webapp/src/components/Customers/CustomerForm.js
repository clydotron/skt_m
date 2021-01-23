import React from 'react'
import { Field, reduxForm } from 'redux-form'

class CustomerForm extends React.Component {

    renderError({error, touched}) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    renderInput = ({input,label,meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' :''}`;
        return ( 
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues)
    }

    render() {
        return (
           <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
               <Field name="name" component={this.renderInput} label="Enter Full Name" />
               <Field name="phone" component={this.renderInput} label="Enter Phone Number"/>
               <Field name="email" component={this.renderInput} label="Enter Email"/>
            <button className="ui button primary">Submit</button>
           </form>
        )
    }
}

const validate = (formValues) => {
    const errors = {}
    if(!formValues.name) {
        errors.name = "You must enter a valid name"
    }
    // needs either a valid email or phone...
    // if (!formValues.phone) {
    //     // validate the #
    //     errors.phone = "You must enter a valid phone number"
    // }
    if (!formValues.email) {
        // validate the #
        errors.email = "You must enter a valid email address"
    }
    return errors;
}

export default reduxForm({
    form: 'customerForm',
    validate
})(CustomerForm);


