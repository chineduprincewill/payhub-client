import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getLocation } from '../../actions/locationActions';
import { newUser } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

class UserLocation extends Component {

    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            usertype: '',
            firstname: '',
            lastname: '',
            othernames: '',
            mobile: '',
            bank: '',
            state: '',
            city: '',
            address: '',
            country: '',
            errors: [],
            isClicked: false
        }
  
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){

        const locid = this.props.location.locid;

        this.props.getLocation(locid, this.props.auth.user.usertype);

        //this.props.getAllBanks();
    }


    UNSAFE_componentWillReceiveProps(nextProps){

        if(nextProps.office.location){
            const location = nextProps.office.location;
    
            this.setState({
                bank: location.bank,
                state: location.state,
                city: location.city,
                address: location.address
            });
        }

        if(nextProps.errors){
            this.setState({errors: nextProps.errors.error.data, isClicked: false});
        }
      }


      onSubmit(e){
          e.preventDefault();

          this.setState({
            isClicked: true
          })

          const userData = {

            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
            usertype: this.state.usertype,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            othernames: this.state.othernames,
            mobile: this.state.mobile,
            bank: this.state.bank,
            state: this.state.state,
            city: this.state.city,
            address: this.state.address,
            country: 'Nigeria'

          }

          this.props.newUser(userData, this.props.auth.user.usertype, this.props.history);

      }


      onChange(e){
        this.setState({ [e.target.name] : e.target.value })
      }
      
  render() {

    const { name, email, password, password_confirmation, usertype, firstname, lastname, othernames, mobile, isClicked, errors } = this.state;
    const { location, loading } = this.props.office;

    let addUserForm;

    let clickStatus;

    if(isClicked){
        clickStatus = <Spinner />
    }
    else{
        clickStatus = (
            <input 
                type="submit" 
                className="btn btn-info btn-block mt-4" 
                value="Add User" 
            />
        );
    }


    if(location === null || loading) {
        addUserForm = <Spinner />
    }
    else{
        if(Object.keys(location).length > 0){

            addUserForm = (

                <form onSubmit={this.onSubmit}>
                    <p className="bg-info text-light p-2 mb-3">{this.state.bank}</p>
                    <p className="bg-dark text-light p-2">{this.state.address} {this.state.city} {this.state.state}</p>
                    <div className="form-group">
                      <input 
                          type="text" 
                          className="form-control form-control-md" 
                          placeholder="username" 
                          name="name" 
                          value={name}
                          onChange={this.onChange}
                          required
                      />
                    </div>

                    <div className="form-group">
                      <input 
                          type="email" 
                          className="form-control form-control-md" 
                          placeholder="email" 
                          name="email" 
                          value={email}
                          onChange={this.onChange}
                          required
                      />
                    </div>
                    
                    <div className="form-group">
                      <input 
                          type="password" 
                          className="form-control form-control-md" 
                          placeholder="password" 
                          name="password" 
                          value={password}
                          onChange={this.onChange}
                          required
                      />
                    </div>

                    <div className="form-group">
                      <input 
                          type="password" 
                          className="form-control form-control-md" 
                          placeholder="confirm password" 
                          name="password_confirmation" 
                          value={password_confirmation}
                          onChange={this.onChange}
                          required
                      />
                    </div>

                    <div className="form-group">
                      <select 
                        className="form-control"
                        name="usertype"
                        value={usertype}
                        onChange={this.onChange}
                        required
                      >
                        <option value="">--Select user role--</option>
                        <option value="admin">admin</option>
                        <option value="hop">hop</option>
                        <option value="teller">teller</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <input 
                          type="text" 
                          className="form-control form-control-md" 
                          placeholder="first name" 
                          name="firstname" 
                          value={firstname}
                          onChange={this.onChange}
                          required
                      />
                    </div>

                    <div className="form-group">
                      <input 
                          type="text" 
                          className="form-control form-control-md" 
                          placeholder="last name" 
                          name="lastname" 
                          value={lastname}
                          onChange={this.onChange}
                          required
                      />
                    </div>

                    <div className="form-group">
                      <input 
                          type="text" 
                          className="form-control form-control-md" 
                          placeholder="other names" 
                          name="othernames" 
                          value={othernames}
                          onChange={this.onChange}
                          required
                      />
                    </div>

                    <div className="form-group">
                      <input 
                          type="text" 
                          className="form-control form-control-md" 
                          placeholder="mobile" 
                          name="mobile" 
                          value={mobile}
                          onChange={this.onChange}
                          required
                      />
                    </div>
                    
                    {clickStatus}
                </form>
            );
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
                <Link to="/users" className="btn btn-primary float-right">
                    <i className="fa fa-search"></i> Users
                </Link>
                </div>
            </div>

            <div className="row mt-1">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <p className="lead text-center text-danger">
                        { errors ? errors : '' }
                    </p>
                    {addUserForm}
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
        );
  }
}

UserLocation.propTypes = {
    getLocation: PropTypes.func.isRequired,
    newUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    office: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    office: state.location,
    errors: state.errors
});

export default connect(mapStateToProps, { getLocation, newUser })(withRouter(UserLocation));

