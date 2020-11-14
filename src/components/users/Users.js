import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { getAllProfiles, updateUser } from '../../actions/profileActions';

export class Users extends Component {

   

    componentDidMount(){

        const { user } = this.props.auth;
        this.props.getAllProfiles(user.usertype, user.address);
    }


    trasferCredit = (userid) => {

        this.props.history.push({
            pathname: '/credit-transfer',
            userid:  userid 
          });
    }


    handleActivation = (userid, userstatus) => {

        let updateData;

        const { usertype, address } = this.props.auth.user;

        if(userstatus === 1){
            updateData = {
                status: 0
            }
        }
        else{
            updateData = {
                status: 1
            }
        }

        console.log(updateData);

        this.props.updateUser(userid, usertype, address, updateData);

    }


    disableUser = (userid) => {
        
        const updateData = {
            status: 0
        }

        this.props.updateUser(userid, updateData, this.props.history);
    }


  render() {

    const { profiles, loading } = this.props.profile;

    let profilesList;

    if(profiles === null || loading) {
        profilesList = <Spinner />
    }
    else{
        if(Object.keys(profiles).length > 0){
            const data = Array.from(profiles);

            profilesList = data.map(usr => (
                <tr key={usr.id}>                      
                    <td>{usr.lastname} {usr.firstname} {usr.othernames}</td>
                    <td>{usr.email}</td>
                    <td>{usr.usertype}</td>
                    <td>{usr.mobile}</td>
                    <td>{usr.bank}</td>
                    <td>{usr.address} {usr.city} {usr.state} {usr.country}</td>
                    <td>
                        {this.props.auth.user.usertype === 'teller' ? '' : 
                            <button 
                                className={ usr.status === 1 ? "btn btn-link btn-sm text-danger" : "btn btn-link btn-sm text-success"}
                                onClick={this.handleActivation.bind(this, usr.id, usr.status)}
                            >
                                {usr.status === 1 ? "disable" : "enable"}
                            </button>
                        }

                        {this.props.auth.user.id !== usr.id ? <button
                            className="btn btn-link btn-sm text-primary"
                            title="click to transfer credit to user"
                            onClick={this.trasferCredit.bind(this, usr.id)}
                            
                        >transfer</button> : ''}
                        
                    </td>
                </tr>
                )
            )
        }
        else{
            profilesList = <td colSpan="7" className="text text-danger">You have no profile to display...</td>
        }
    }

    return (
      <div className="container">
          <div className="row">
              <div className="col-md-12 border-bottom">
                <span className="display-4">Users</span>
                <Link to="/dashboard" className="btn btn-link float-right mt-4"><i className="fa fa-dashboard"></i> Dashboard</Link>
              </div>
            
            
              <div className="col-md-12 mt-5">
                <div className="bg-info text-light p-2 mb-3">
                To make a <b>Transfer</b> locate the User you wish to make the transfer to from the list below and click the transfer link by the right. <b>Note: Transfers are made to Users</b>
                </div>
                {this.props.auth.user.usertype === 'admin' ? 
                    <Link to="/locations" className="btn btn-primary float-right">
                        <i className="fa fa-plus"></i> Users
                    </Link> : ''
                }
              </div> 
            
              

            <div className="col-md-12 mt-1">
                <table className="table table-hover table-responsive borderless">
                    <tbody>
                        <tr className="text text-success">
                            <td>Name</td>
                            <td>Email</td>
                            <td>Role</td>
                            <td>mobile</td>
                            <td>Bank/Establishment</td>
                            <td>Office Address</td>
                            <td />
                        </tr>
                        { profilesList }
                    </tbody>
                </table>
            </div>
          </div>
      </div>
    );
  }
}

Users.propTypes = {
    getAllProfiles: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getAllProfiles, updateUser })(Users);
