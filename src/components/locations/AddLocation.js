import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAllBanks } from '../../actions/bankActions';
import { newLocation } from '../../actions/locationActions';
import data from '../../utils/state.json';
import Spinner from '../common/Spinner';

export class AddLocation extends Component {

  constructor(){
      super();
      this.state = {
          bank: '',
          state: '',
          city: '',
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

    const locationData = {
          bank: this.state.bank,
          state: this.state.state,
          city: this.state.city,
          address: this.state.address,
          created_by: this.props.auth.user.email,
          status: 1
    }

    this.props.newLocation(locationData, this.props.auth.user.usertype, this.props.history);
  }


  onChange(e){
    this.setState({ [e.target.name] : e.target.value })
  }


  render() {

    const { address, city, state, bank } = this.state;
    const { banks, loading } = this.props.bank;

    let listBanks;

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

    const listStates = data.map( (data) => {
        return (
            <option key={data.state.id} value={data.state.name}>
                {data.state.name}
            </option>
        )
    }) 


    return (
      <div className="container">
          <div className="row">
              <div className="col-md-12 border-bottom">
                <span className="display-4">Locations</span>
                <Link to="/dashboard" className="btn btn-link float-right mt-4"><i className="fa fa-dashboard"></i> Dashboard</Link>
              </div>

              <div className="col-md-12 mt-5">
                  <Link to="/locations" className="btn btn-primary float-right">
                      <i className="fa fa-search"></i> Locations
                  </Link>
              </div>
          </div>

          <div className="row mt-3">
              <div className="col-md-3"></div>
              <div className="col-md-6">

                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                      <select 
                        className="form-control"
                        name="bank"
                        value={bank}
                        onChange={this.onChange}
                      >
                        <option value="">--Select Bank--</option>
                        { listBanks }
                      </select>
                    </div>

                    <div className="form-group">
                      <select 
                        className="form-control"
                        name="state"
                        value={state}
                        onChange={this.onChange}
                      >
                        <option value="">--Select State--</option>
                        { listStates }
                      </select>
                    </div>

                    <div className="form-group">
                      <input 
                          type="text" 
                          className="form-control form-control-md" 
                          placeholder="city" 
                          name="city" 
                          value={city}
                          onChange={this.onChange}
                      />
                    </div>

                    <div className="form-group">
                        <textarea 
                          name="address"
                          placeholder="Address"
                          className="form-control form-control-md"
                          value={address}
                          onChange={this.onChange}
                        ></textarea>
                    </div>
                    
                    <input 
                        type="submit" 
                        className="btn btn-info btn-block mt-4" 
                        value="Add Location" 
                    />
                </form>
              </div>
              <div className="col-md-3"></div>
          </div>
      </div>
    );
  }
}

AddLocation.propTypes = {
  getAllBanks: PropTypes.func.isRequired,
  newLocation: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  bank: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  bank: state.bank
});

export default connect(mapStateToProps, { getAllBanks, newLocation })(withRouter(AddLocation));
