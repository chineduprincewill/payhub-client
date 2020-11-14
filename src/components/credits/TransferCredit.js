import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUser } from '../../actions/profileActions';
import { makeTransfer } from '../../actions/creditActions';
import Spinner from '../common/Spinner';

export class TransferCredit extends Component {


  constructor(){
      super();
      this.state = {
          receiver: '',
          receiver_role: '',
          receiver_bank: '',
          receiver_city: '',
          receiver_state: '',
          receiver_address: '',
          amount: '',
          errors: {},
          isClicked: false
      }

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){

    const userid = this.props.location.userid;

    this.props.getUser(userid);

  }


  UNSAFE_componentWillReceiveProps(nextProps){

    if(nextProps.profile.profile){
        const profile = nextProps.profile.profile;

        this.setState({
            receiver: profile.email,
            receiver_role: profile.usertype,
            receiver_bank: profile.bank,
            receiver_city: profile.city,
            receiver_state: profile.state,
            receiver_address: profile.address
        });
    }

    if(nextProps.errors){
        this.setState({errors: nextProps.errors.error.data, isClicked: false});
    }
  }


  onSubmit(e){
    e.preventDefault();

    const {user} = this.props.auth;

    this.setState({
      isClicked: true
    });

    const locationData = {
        sender: user.email,
        sender_role: user.usertype,
        sender_bank: user.bank,
        sender_city: user.city,
        sender_state: user.state,
        sender_address: user.address,
        receiver: this.state.receiver,
        receiver_role: this.state.receiver_role,
        receiver_bank: this.state.receiver_bank,
        receiver_city: this.state.receiver_city,
        receiver_state: this.state.receiver_state,
        receiver_address: this.state.receiver_address,
        amount: this.state.amount
    }

    //console.log(locationData);

    this.props.makeTransfer(locationData, this.props.history);
  }


  onChange(e){
    this.setState({ [e.target.name] : e.target.value })
  }


  render() {

    const { receiver, receiver_role, receiver_bank, receiver_city, receiver_state, receiver_address, amount, isClicked } = this.state;

    const { profile, loading } = this.props.profile;

    let transferForm;

    let clickStatus;

    if(isClicked){
        clickStatus = <Spinner />
    }
    else{
        clickStatus = (
            <input 
                type="submit" 
                className="btn btn-info btn-block mt-4" 
                value="Transfer" 
            />
        );
    }

    if(profile === null || loading) {
        transferForm = <Spinner />
    }
    else{
        if(Object.keys(profile).length > 0){

          transferForm = (
                <form onSubmit={this.onSubmit}>

                  <p className="text text-primary p-2">{receiver} ( {receiver_role} )</p>
                  <p className="text text-primary p-2">{receiver_bank}</p>
                  <p className="text text-primary p-2">{receiver_address}, {receiver_city}, {receiver_state}</p>
                
                  <div className="form-group p-2">
                    <input
                      type="text" 
                      className="form-control"
                      placeholder="Enter amount..."
                      name="amount"
                      value={amount}
                      onChange={this.onChange}
                      required
                    />
                  </div>

                  {clickStatus}
                </form>
            )
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
                <Link to="/credits" className="btn btn-primary float-right">
                    <i className="fa fa-search"></i> Transfers
                </Link>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <span className="text text-primary">
                </span>
                {transferForm}
            </div>
            <div className="col-md-3"></div>
          </div>
      </div>
    );
  }
}

TransferCredit.propTypes = {
  getUser: PropTypes.func.isRequired,
  makeTransfer: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  error: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { getUser, makeTransfer })(TransferCredit);
