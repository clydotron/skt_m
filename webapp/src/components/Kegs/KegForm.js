import React from 'react'
import { Field, reduxForm } from 'redux-form'

class KegForm extends React.Component {

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
               <Field name="code" component={this.renderInput} label="Enter coded ID" />
               <Field name="size" component={this.renderInput} label="Enter size in gallons"/>
               
            <button className="ui button primary">Submit</button>
           </form>
        )
    }
}

const validate = (formValues) => {
    const errors = {}
    if(!formValues.code) {
        errors.name = "You must enter a valid code"
    }

    if (!formValues.size) {
        // validate the #
        errors.email = "You must enter a valid size"
    }
    return errors;
}

export default reduxForm({
    form: 'kegForm',
    validate
})(KegForm);


/*
        <div class="grouped fields">
          <div class="field">
            <div class="ui radio checkbox">
              <input type="radio" name="size" value="15">
              <label>5</label>
            </div>
          </div>
          <div class="field">
            <div class="ui radio checkbox">
              <input type="radio" name="size" value="medium">
              <label>Medium</label>
            </div>
          </div>
          */