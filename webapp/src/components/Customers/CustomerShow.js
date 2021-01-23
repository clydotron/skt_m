import React from 'react'
import { connect } from 'react-redux'
import { fetchCustomer, returnKeg } from '../../actions'


/* 
    this view will show the customer's contact information: name, email, phone, address
    list of kegs currently in their possesion
    activity history
*/
class CustomerShow extends React.Component {

    componentDidMount() {
        this.props.fetchCustomer(this.props.match.params.id);
    }

    onReturnKeg = (kegId) => {
 
        const {id} = this.props.match.params
        this.props.returnKeg(id,kegId)
    }

    renderKegs() {
        if (this.props.customer.kegs === null) {
            return <div>None.</div>
        }

        return this.props.customer.kegs.map((keg,index) => {

            //const timestamp = Date.now(); // This would be the timestamp you want to format
            //const formattedDate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(keg.timestamp);

            return (
                <div className="item" key={index}>
                    <div className="right floated content">
                        <button onClick={() => { this.onReturnKeg(keg.kegid)}} className="ui button primary">Return</button>
                    </div>
                    <i className="large beer middle aligned icon"></i>

                    <div className="content">
                        <div className="header">{keg.contents}</div>
                        <div className="description">{keg.timestamp}</div>
                    </div>
                </div>
            )
        });
    }

    renderTransactions() {
        return <div>None.</div>
    }
//style={{ textAlign: 'right' }}>
    renderPurchase() {
       
            return (
                <div >
                    <button  className="ui button primary">
                    Purchase Keg
                    </button>
                </div>
            )
        
    }

    render() {
        if (!this.props.customer) {
            return <div>Loading...</div>
        }
        const { customer } = this.props;
        //console.log(customer)
        return (
            <div>
                <div className="ui content">

                    <h4>{customer.name}</h4>
                    {customer.email}
                </div>
             
             <br/>
             <h3>Current Kegs</h3>
             <div className="ui relaxed divided list">
                {this.renderKegs()}
             </div>
            <br/>
            <h3>Transaction History</h3>
             <div className="ui relaxed divided list">
                {this.renderTransactions()}
             </div>
             <br/>
            {this.renderPurchase()}
            </div>
        )
    };
}


const mapStateToProps = (state, ownProps) => {
    return { customer: state.customers[ownProps.match.params.id] }
}

export default connect(mapStateToProps,{fetchCustomer,returnKeg})(CustomerShow);