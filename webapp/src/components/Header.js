import React from 'react'
import {Link} from 'react-router-dom'
import GoogleAuth from './GoogleAuth'

const Header = () => {
    return  (
        <div className="ui secondary pointing menu">
            <Link to="/customers" className="item">
                <i className="large middle aligned icon users" />
                Customers
            </Link>
            <Link to="/kegs" className="item">
                <i className="large middle aligned icon beer" />
                Kegs
            </Link>
            <Link to="/actions" className="item">
            <i className="large middle aligned icon archive" />
                Actions
            </Link>
            <div className="right menu">
                <GoogleAuth />
            </div>
        </div>
    );
};

export default Header;