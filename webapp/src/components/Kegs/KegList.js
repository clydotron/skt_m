import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchKegs } from '../../actions'
import KegListItem from './KegListItem'

// @todo 
// conditionally show the extended controls if the user mouses over them
// only show controls if this user is an admin
// add size to the list
class KegList extends React.Component {

    componentDidMount() {
        this.props.fetchKegs();
    }

    renderControls(keg) {
        //if (customer.userId === this.props.currentUserId ) {
            return (
                <div className="right floated content">
                    <Link to={`/kegs/edit/${keg.id}`} className="ui button icon">
                        <i className="icon edit"/>
                    </Link>
                    <Link to={`/kegs/delete/${keg.id}`} className="ui button icon">
                    <i className="icon trash"/>
                    </Link>
                </div>
            )
        //}
     }
     
    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="/kegs/new" className="ui button primary">
                    Create Keg
                    </Link>
                </div>
            )
        }
    }

    renderList() {
        return this.props.kegs.map((keg, index) => <KegListItem keg={keg} key={index}/>);
    }

    render() {
        return (
            <div>
                <h2>Kegsz</h2>
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
        kegs: Object.values(state.kegs),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}
export default connect(mapStateToProps,{fetchKegs})(KegList);