import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }

  render() {
    return (
        <div className="landing">
            <div className="dark-overlay landing-inner text-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-3 mt-5 mb-4">Payments Simplified
                            </h1>
                            <p className="lead"> Make all your Government Approved payments from one point</p>
                            <hr />
                            <Link to="/login" className="btn btn-lg btn-info mr-2">Sign In</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Landing);
