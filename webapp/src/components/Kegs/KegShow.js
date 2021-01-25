import React from 'react'
import { connect } from 'react-redux'
import { fetchKeg } from '../../actions'


class KegShow extends React.Component {

    componentDidMount() {
        this.props.fetchKeg(this.props.match.params.id);
    }

    renderDetails = (details) => {
        const output = {}
        details.map(data => {
            console.log(data["Key"],data["Value"]);
        })
    }
    renderTransactions = () => {
        if (this.props.keg.history.length === 0) {
            return <div>None.</div>
        }

        return this.props.keg.history.map((item,index) => {

            const dvalue = new Date(item.timeStamp).toDateString()
            const keys =  Object.keys(item.data)
            console.log(keys)

            return (
                <div key={index}>
                    {dvalue} {item.action}
                </div>
            )
        });
    };

    render() {
        
        const {keg} = this.props;
        console.log(keg)

        //const timestamp = Date.now(); // This would be the timestamp you want to format
        //console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp));

        if (!keg) {
            return <div>Loading...</div>
        }
        
        return (
            <div>
                Keg: {keg.code}
                <br/>
                <h4>History</h4>
                <div>
                    {this.renderTransactions()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { keg: state.kegs[ownProps.match.params.id] }
}

export default connect(mapStateToProps,{fetchKeg})(KegShow);