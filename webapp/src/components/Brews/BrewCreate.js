import React from 'react'
import { connect } from 'react-redux'
import { createBrew } from '../../actions'
import BrewForm from './BrewForm'

class BrewCreate extends React.Component {

    onSubmit = (formValues) => {
        this.props.createBrew(formValues)
    }

    render() {
        return (
            <div>
                <h3>Create a Brew:</h3>
                <BrewForm onSubmit={this.onSubmit}   />
            </div>
        );
    }
}

export default connect(null,{ createBrew })(BrewCreate);

