import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllTransfers } from '../../actions/creditActions';
import { getUser } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

export class Credits extends Component {

  constructor(){
    super();
    this.state = {
        walletbalance: ''
    }
}

  componentDidMount(){

    const { user} = this.props.auth;

    this.props.getAllTransfers(user.usertype, user.email);

    this.props.getUser(user.id);
  }


  UNSAFE_componentWillReceiveProps(nextProps){

    if(nextProps.profile.profile){
        const profile = nextProps.profile.profile;

        this.setState({
            walletbalance: profile.walletbalance
        });
    }
  }


  render() {

    const { loading, transfers } = this.props.credit;


    let transferList;

    if(transfers === null || loading) {
      transferList = <Spinner />
    }
    else{
        if(Object.keys(transfers).length > 0){
            const data = Array.from(transfers);

            transferList = data.map(trns => (
                <tr key={trns.id}>                      
                    <td>{trns.sender} @ {trns.sender_address} {trns.sender_city}, {trns.sender_state}</td>
                    <td>{trns.sender_role}</td>
                    <td>{trns.sender_bank}</td>
                    <td>{trns.receiver} @ {trns.receiver_address} {trns.receiver_city}, {trns.receiver_state}</td>
                    <td>{trns.receiver_role}</td>
                    <td>{trns.receiver_bank}</td>
                    <td>&#8358;{trns.amount}</td>
                    <td>{trns.created_at}</td>
                    <td>
                    <button
                        className="btn btn-link btn-sm"
                    >
                        <i className="fa fa-edit"></i>
                    </button>
                    <button
                        className="btn btn-link btn-sm text-danger"
                    >
                        <i className="fa fa-remove"></i>
                    </button>
                    </td>
                </tr>
                )
            )
        }
        else{
          transferList = <td colSpan="11" className="text text-danger">You have no transfer records to display...</td>
        }
    }

    return (
      <div className="container">
          <div className="row">
              <div className="col-md-12 border-bottom">
                <span className="display-4">Credit Tranfers</span>
                <Link to="/dashboard" className="btn btn-link float-right mt-4"><i className="fa fa-dashboard"></i> Dashboard</Link>
              </div>

              <div className="col-md-12 mt-5">
                <Link to="/credits" className="btn btn-warning">
                    Balance: <b>&#8358;{this.state.walletbalance}</b>
                </Link>
                <Link to="/users" className="btn btn-primary float-right">
                    <i className="fa fa-share"></i> Transfer
                </Link>
            </div>

            <div className="col-md-12 mt-3">
                <table className="table table-hover table-responsive borderless">
                    <tbody>
                        <tr className="text text-success">
                            <td>Sender</td>
                            <td>Role</td>
                            <td>Bank</td>
                            <td>Receiver</td>
                            <td>Role</td>
                            <td>Bank</td>
                            <td>Amount</td>
                            <td>Date</td>
                            <td />
                        </tr>
                        { transferList }
                    </tbody>
                </table>
            </div>
          </div>

          
      </div>
    );
  }
}

Credits.propTypes = {
  getAllTransfers: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  credit: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  credit: state.credit,
  profile: state.profile
});

export default connect(mapStateToProps, { getAllTransfers, getUser })(Credits);
