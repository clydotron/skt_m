import React from 'react'
import { Form, Field } from 'react-final-form'

const required = value => (value ? undefined : 'Required')

const BrewForm = () => {

    const onSubmit = (values) => {
        console.log(values)
    };

    // const onRender = () => {

    // }
    
    const renderError = ({error, touched}) => {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    const renderInput = ({input,label,meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' :''}`;
        return ( 
            <div className={className}>
                <label>{label}</label>
                <input {...input}  autoComplete="off" />
                {renderError(meta)}
            </div>
        );
    }
    

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit} className="ui form error">
                    <Field name="firstName" validate={required}>
                        {({ input, meta }) => (
                            <div className="field">
                                <label>Name</label>
                                <input {...input} type="text" placeholder="Name" />
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>
                    <Field name="style" component={renderInput} label="Enter Style" />

                    <Field name="firstName" validate={required}>
                        {({ input, meta }) => (
                            <div>
                                <label>ABVx</label>  
                                <br/>                    
                                <div className="ui right labeled input">
                                    <input {...input} type="text" placeholder="Enter ABV"/>
                                    <div className="ui basic label">
                                        %
                                    </div>
                                </div>
                            </div>
                        )}
                    </Field>
                    <div>
                        <button type="submit" disabled={submitting} className="ui button primary">
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={form.reset}
                            disabled={submitting || pristine}
                            className="ui button"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            )}
        />
    )
}

export default BrewForm;
//<pre>{JSON.stringify(values, 0, 2)}</pre>