import React from 'react'
import { Form, Field } from 'react-final-form'


// validators:
const required = value => (value ? undefined : 'Required')
const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
//const minValue = min => value =>
//  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`
const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

  
class BrewForm extends React.Component {

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
                <input {...input}  autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }

    renderABV = ({input,label,meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' :''}`;
        return ( 
            <div className={className}>
                <label>{label}</label>
                <div className="ui right labeled input">
                    <input {...input} autoComplete="off" placeholder="0.0" />
                    <div className="ui basic label">
                        %
                    </div>
                </div>
                {this.renderError(meta)}
            </div>
        );
    }
    

    onSubmit = (values) => {
        this.props.onSubmit(values)
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (

                <form className="ui form error" onSubmit={handleSubmit}>
                    <Field 
                        name="name" 
                        component={this.renderInput} 
                        validate={required}
                        label="Enter Name" />
                    <Field name="style" component={this.renderInput} label="Enter Style"/>
                    <Field name="description" component={this.renderInput} label="Enter Description"/>
                    <Field 
                        name="abv" 
                        validate={composeValidators(required,mustBeNumber)}
                        component={this.renderABV} 
                        label="Enter ABV"/>
                    <Field 
                        name="ibu" 
                        component={this.renderInput} 
                        validate={composeValidators(required,mustBeNumber)}
                        label="Enter IBU"/>
                    <Field name="notes" component={this.renderInput} label="Enter notes"/>
                    <div className="buttons">
                        <button type="submit" className="ui button primary" disabled={submitting}>
                            Submit
                        </button>
                        <button
                            type="button"
                            className="ui button"
                            onClick={form.reset}
                            disabled={submitting || pristine}
                        >
                            Reset
                        </button>
                    </div>            
                    <pre>{JSON.stringify(values, 0, 2)}</pre>
                </form>
            )}
            />
        )
        
    }
}
//                    <button className="ui button primary">Submit</button>

export default BrewForm;
