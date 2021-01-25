import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const KegListItem = ({keg}) => {

    const [mouseOver,setMouseOver] = useState(false)

    //@todo add isAdmin support?
    // min height
    const renderControls = (keg) => {
        if (!mouseOver) {
            return null
        }

        return (
            <div className="right floated content" >
                <Link to={`/kegs/purchase/${keg.id}`} className="ui button icon">
                    <i className="icon shopping cart"/>
                </Link>
                <Link to={`/kegs/edit/${keg.id}`} className="ui button icon">
                    <i className="icon edit"/>
                </Link>
                <Link to={`/kegs/delete/${keg.id}`} className="ui button icon">
                    <i className="icon trash"/>
                </Link>

            </div>
        );
    }

    return (
        <div 
            className="item" 
            key={keg.id} 
            onMouseEnter={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
            style={{minHeight: 43 }}
        >
            {renderControls(keg)}
            <i className="large middle aligned icon beer" />
            <div className="content">
                <Link to={`/kegs/${keg.id}`} className="header">{keg.code}</Link>
            </div>
        </div>
    );
}

export default KegListItem;