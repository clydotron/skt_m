import React, { useEffect } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchCustomer, editCustomer } from '../../actions'
import CustomerForm from './CustomerForm'

class CustomerEdit extends React.Component {

    componentDidMount() {
        this.props.fetchCustomer(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editCustomer(this.props.match.params.id, formValues)
    }

    render() {
        if (!this.props.customer) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <h3>Edit Customer</h3>
                <CustomerForm 
                    initialValues={_.pick(this.props.customer,"name","phone","email")}
                    onSubmit={this.onSubmit} 
                    />
            </div>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return { customer: state.customers[ownProps.match.params.id] }
}

export default connect(mapStateToProps,{fetchCustomer,editCustomer})(CustomerEdit);