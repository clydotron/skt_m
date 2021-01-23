import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchCustomers } from '../../actions'

class CustomerList extends React.Component {

    componentDidMount() {
        this.props.fetchCustomers();
    }

    renderAdmin(customer) {
        //if (customer.userId === this.props.currentUserId ) {
            return (
                <div className="right floated content">
                    <Link to={`/customers/edit/${customer.id}`} className="ui button primary">Edit</Link>
                    <Link to={`/customers/delete/${customer.id}`} className="ui button negative">Delete</Link>
                </div>
            )
        //}
     }
    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="/customers/new" className="ui button primary">
                    Create Customer
                    </Link>
                </div>
            )
        }
    }

    renderList() {
        return this.props.customers.map(customer => {
            return (
                <div className="item" key={customer.id} >
                    {this.renderAdmin(customer)}
                    <i className="large middle aligned icon user" />
                    <div className="content">
                        <Link to={`/customers/${customer.id}`} className="header">{customer.name}</Link>
                    </div>
                </div>
            )
        })
    }
    render() {
        return (
            <div>
                <h2>Customers</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        )
    };
}

const mapStateToProps = (state) => {
    return { 
        customers: Object.values(state.customers),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}
export default connect(mapStateToProps,{fetchCustomers})(CustomerList);