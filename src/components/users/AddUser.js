import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';

import { getAllBanks } from '../../actions/bankActions';
import { getBankOffices } from '../../actions/locationActions';

export class AddUser extends Component {

  constructor(){
      super();
      this.state = {
          name: '',
          email: '',
          password: '',
          firstname: '',
          lastname: '',
          othernames: '',
          mobile: '',
          bank: '',
          address: '',
          errors: {}
      }

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }


  componentDidMount(){

    this.props.getAllBanks();
  }


  onSubmit(e){
      e.preventDefault();

      const userData = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          othernames: this.state.othernames,
          mobile: this.state.mobile,
          bank: this.state.bank,
          address: this.state.address
      }

      console.log(userData);

      //this.props.createUser(userData);

      //console.log(user);
  }

  onChange(e){
      this.setState({ [e.target.name] : e.target.value })
  }

  render() {

    const { banks, loading } = this.props.bank;
    const { locations } = this.props.location;

    let listBanks;
    let bankLocations;

    if(banks === null || loading) {
      listBanks = <Spinner />
    }
    else{
      if(Object.keys(banks).length > 0){

          const data = Array.from(banks);

          listBanks = data.map(bnk => (
            <option key={bnk.id} value={bnk.bankname}>{bnk.bankname}</option>
          ));
      }
    }


    if(locations === null || loading) {
      bankLocations = <Spinner />
    }
    else{
      if(Object.keys(locations).length > 0){

          const data = Array.from(locations);

          bankLocations = data.map(loc => (
            <option key={loc.id} value={ loc.address + "," + loc.city + "," + loc.state }>{ loc.address + "," + loc.city + "," + loc.state }</option>
          ));
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

          <div className="row mt-3">
            <div className="col-md-3"></div>
            <div className="col-md-6">

                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input 
                        type="text" 
                          className="form-control form-control-md" 
                        placeholder="username" 
                        name="name" 
                        value={this.state.name}
                        onChange={this.onChange}
                    />
                    </div>
                    <div className="form-group">
                    <input 
                        type="email" 
                          className="form-control form-control-md" 
                        placeholder="Email Address" 
                        name="email" 
                        value={this.state.email}
                        onChange={this.onChange}
                    />
                    </div>
                    <div className="form-group">
                    <input 
                        type="password" 
                        className="form-control form-control-md" 
                        placeholder="Password" 
                        name="password" 
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                    </div>

                    <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control form-control-md" 
                        placeholder="first name" 
                        name="firstname" 
                        value={this.state.firstname}
                        onChange={this.onChange}
                    />
                    </div>

                    <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control form-control-md" 
                        placeholder="surname" 
                        name="lastname" 
                        value={this.state.lastname}
                        onChange={this.onChange}
                    />
                    </div>

                    <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control form-control-md" 
                        placeholder="other names" 
                        name="othernames" 
                        value={this.state.othernames}
                        onChange={this.onChange}
                    />
                    </div>

                    <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control form-control-md" 
                        placeholder="mobile" 
                        name="mobile" 
                        value={this.state.mobile}
                        onChange={this.onChange}
                    />
                    </div>

                    <div className="form-group">
                      <select 
                        className="form-control"
                        name="bank"
                        value={this.state.bank}
                        onChange={this.onChange}
                      >
                        <option value="">--Select Bank--</option>
                        { listBanks }
                      </select>
                    </div>

                    <div className="form-group">
                      <select 
                        className="form-control"
                        name="address"
                        value={this.state.address}
                        onChange={this.onChange}
                      >
                        <option value="">--Select Address--</option>
                        { bankLocations }
                      </select>
                    </div>

                    <input 
                        type="submit" 
                        className="btn btn-info btn-block mt-4" 
                        value="Add User" 
                    />
                </form>

            </div>
            <div className="col-md-3"></div>
          </div>

          
      </div>
    );
  }
}

AddUser.propTypes = {
  getAllBanks: PropTypes.func.isRequired,
  getBankOffices: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  bank: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  bank: state.bank,
  location: state.location
});

export default connect(mapStateToProps, { getAllBanks, getBankOffices })(AddUser);
