import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAllBanks } from '../../actions/bankActions';
import { updateLocation, getLocation } from '../../actions/locationActions';
import data from '../../utils/state.json';
import Spinner from '../common/Spinner';

export class EditLocation extends Component {

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

    const locid = this.props.location.locid;

    this.props.getLocation(locid, this.props.auth.user.usertype);

    this.props.getAllBanks();
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
  }


  onSubmit(e){
    e.preventDefault();

    const locid = this.props.office.location.id;

    const locationData = {
          bank: this.state.bank,
          state: this.state.state,
          city: this.state.city,
          address: this.state.address
    }

    this.props.updateLocation(locid, this.props.auth.user.usertype, locationData, this.props.history);
  }


  onChange(e){
    this.setState({ [e.target.name] : e.target.value })
  }


  render() {

    const { address, city, state, bank } = this.state;
    const { banks } = this.props.bank;
    //const { location, loading } = this.props.location;

    let listBanks;
    let editLocationForm;

    if(banks === null || this.props.bank.loading) {
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

    if(this.props.office.location === null || this.props.office.loading) {
        editLocationForm = <Spinner />
    }
    else{
        if(Object.keys(this.props.office.location).length > 0){

            editLocationForm = (

                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                      <select 
                        className="form-control"
                        name="bank"
                        value={bank}
                        onChange={this.onChange}
                      >
                        <option value={bank}>{bank}</option>
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
                        <option value={state}>{state}</option>
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
                        value="Update Location" 
                    />
                </form>
            );
        }
    }


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
                {editLocationForm}
              </div>
              <div className="col-md-3"></div>
          </div>
      </div>
    );
  }
}

EditLocation.propTypes = {
  getAllBanks: PropTypes.func.isRequired,
  updateLocation: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  bank: PropTypes.object.isRequired,
  office: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  bank: state.bank,
  office: state.location
});

export default connect(mapStateToProps, { getAllBanks, updateLocation, getLocation })(withRouter(EditLocation));
