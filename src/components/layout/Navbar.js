import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authAction';
import { clearCurrentProfile } from '../../actions/profileActions';

import Adminlinks from './navbar/Adminlinks';
import Hoplinks from './navbar/Hoplinks';
import Tellerlinks from './navbar/Tellerlinks';

class Navbar extends Component {

    onLogoutClick = (e) => {
        e.preventDefault();

        this.props.clearCurrentProfile();
        this.props.logoutUser();
    }

  render() {

    const { isAuthenticated, user } = this.props.auth;

    let userlinks;

    if(user.usertype === 'admin'){
        userlinks = <Adminlinks />
    }
    else if(user.usertype === 'hop'){
        userlinks = <Hoplinks />
    }
    else if(user.usertype === 'teller'){
        userlinks = <Tellerlinks />
    }

    const authLinks = (
        <>
            { userlinks }
            <ul className="navbar-nav">
                <li className="nav-item">
                    <button onClick={this.onLogoutClick.bind(this)} className="btn btn-link nav-link">
                        Logout
                    </button>
                </li>
            </ul>
        </>
    );

    const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
                {isAuthenticated ? <Link className="navbar-brand" to="/dashboard">PayHUB</Link> : <Link className="navbar-brand" to="/">PayHUB</Link>}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon"></span>
                </button>
            
                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/profiles">  Welcome { user ? user.name : '' }!
                        </Link>
                    </li>
                    </ul>
            
                    { isAuthenticated ? authLinks : guestLinks }
                </div>
            </div>
        </nav>
    );
  }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    clearCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ 
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);
