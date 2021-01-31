import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchBrews } from '../../actions'


class BrewList extends React.Component {

    componentDidMount() {
        this.props.fetchBrews();
    }
    //{this.renderAdmin(customer)}
    renderList() {
        return this.props.brews.map(brew => {
            return (
                <div className="item" 
                    key={brew.id} 
                >
               
                    <i className="large middle aligned icon beer" />
                    <div className="content">
                        <Link to={`/brews/${brew.id}`} className="header">{brew.name}</Link>
                    </div>
                </div>
            )}
        )
    }

    renderCreate() {
        //if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'left' }}>
                    <Link to="/brews/new" className="ui button primary">
                    Create Brew
                    </Link>
                </div>
            )
        //}
    }

    render() {
        return (
            <div>
                <h2>Brews</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        brews: Object.values(state.brews)
    }
}
export default connect(mapStateToProps,{fetchBrews})(BrewList);