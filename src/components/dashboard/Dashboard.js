import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import Admin from './Admin';
import Hop from './Hop';
import Teller from './Teller';

class Dashboard extends Component {

    componentDidMount(){
        this.props.getCurrentProfile();
    }

  render() { 

    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if(profile === null || loading) {
        dashboardContent = <Spinner />
    }
    else {
        // Check if logged in user has profile data
        // Object.keys(profile).length === 0
        if(user.usertype === 'admin'){
            dashboardContent = <Admin />
        } 
        else if(user.usertype === 'hop'){
                dashboardContent = <Hop />
        }
        else if(user.usertype === 'teller'){
                dashboardContent = <Teller />
        }
    }

    return (
      <div className="dashboard">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h3 className="display-5">Dashboard</h3>
                    {dashboardContent}
                </div>
            </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
