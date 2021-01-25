import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchKeg, deleteKeg } from '../../actions'
import Modal from '../Modal'


class KegDelete extends React.Component {

    componentDidMount() {
        this.props.fetchKeg(this.props.match.params.id);
    }

    renderActions() {
        const {id} = this.props.match.params;
        return (
            <React.Fragment>
                <button 
                    onClick={() => this.props.deleteKeg(id)}
                    className="ui negative button"
                >
                    Delete
                </button>
                <Link to="/kegs" className="ui button">Cancel</Link>
            </React.Fragment>
        );
    };

    renderContent() {
        if(!this.props.keg) {
            return "Are you sure you want to delete this keg?"
        }
        return `Are you sure you want to delete the keg "${this.props.keg.code}"?`
    }

    render() {  
        return (
            <Modal 
                title={"Delete Keg"}
                content={this.renderContent()}
                actions={this.renderActions()} 
            />
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return { keg: state.kegs[ownProps.match.params.id] }
};

export default connect(mapStateToProps,{fetchKeg,deleteKeg})(KegDelete);