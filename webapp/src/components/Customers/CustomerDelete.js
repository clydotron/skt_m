import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCustomer, deleteCustomer } from '../../actions'
import Modal from '../Modal'


class CustomerDelete extends React.Component {

    componentDidMount() {
        this.props.fetchCustomer(this.props.match.params.id);
    }

    renderActions() {
        const {id} = this.props.match.params;
        return (
            <React.Fragment>
                <button 
                    onClick={() => this.props.deleteCustomer(id)}
                    className="ui negative button"
                >
                    Delete
                </button>
                <Link to="/customers" className="ui button">Cancel</Link>
            </React.Fragment>
        );
    };

    renderContent() {
        if(!this.props.customer) {
            return "Are you sure you want to delete this customer?"
        }
        return `Are you sure you want to delete the customer: ${this.props.customer.name}?`
    }

    render() {  
        return (
            <Modal 
                title={"Delete Customer"}
                content={this.renderContent()}
                actions={this.renderActions()} 
            />
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return { customer: state.customers[ownProps.match.params.id] }
};

export default connect(mapStateToProps,{fetchCustomer,deleteCustomer})(CustomerDelete);