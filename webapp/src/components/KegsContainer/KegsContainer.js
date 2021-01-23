import React from 'react'
import KegList from './KegList'
import API from '../../utils/API'

class KegsContainer extends React.Component {
    constructor(props) {
        super(props)

        //const kegs  = [{code: "keg 1x"},{code: "keg 2"},{code: "keg 3"}]
        this.state = { kegs: [] }
    }

    componentDidMount() {
        API.get("kegs")
        .then(resp => {
            const kegs = resp.data
            console.log(kegs)
            this.setState({ kegs: kegs })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <KegList kegs={this.state.kegs} />
        )
    }
}

export default KegsContainer;