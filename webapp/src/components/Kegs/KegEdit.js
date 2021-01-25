import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchKeg, editKeg } from '../../actions'
import KegForm from './CustomerForm'


class KegEdit extends React.Component {
    componentDidMount() {
        this.props.fetchKeg(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editKeg(this.props.match.params.id, formValues)
    }

    render() {
        if (!this.props.keg) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <h3>Edit Keg</h3>
                <KegForm 
                    initialValues={_.pick(this.props.customer,"code","size")}
                    onSubmit={this.onSubmit} 
                    />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { keg: state.kegs[ownProps.match.params.id] }
}

export default connect(mapStateToProps,{fetchKeg,editKeg})(KegEdit);