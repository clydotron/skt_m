import React from 'react'
import { connect } from 'react-redux'
import { createKeg } from '../../actions'
import KegForm from './KegForm'

// this can be a functional component
class KegCreate extends React.Component {

    onSubmit = (formValues) => {
        this.props.createKeg(formValues)
    }

    render() {
        return (
            <div>
                <h3>Create a Keg</h3>
                <KegForm onSubmit={this.onSubmit}   />
            </div>
        );
    }
}

export default connect(null,{ createKeg })(KegCreate);

