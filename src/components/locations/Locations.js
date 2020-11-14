import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllLocations } from '../../actions/locationActions';
import Spinner from '../common/Spinner';

export class Locations extends Component {

  componentDidMount(){

    this.props.getAllLocations(this.props.auth.user.usertype);
  }


  editLocation = (locid) => {

    this.props.history.push({
      pathname: '/edit-location',
      locid:  locid 
    });
  }


  addUser = (locid) => {

    this.props.history.push({
      pathname: '/user-location',
      locid:  locid 
    });
  }


  render() {

    const { locations, loading } = this.props.location;

    let locationList;

    if(locations === null || loading) {
      locationList = <Spinner />
    }
    else{
        if(Object.keys(locations).length > 0){
            const data = Array.from(locations);

            locationList = data.map(loc => (
                <tr key={loc.id}>                      
                    <td>{loc.bank}</td>
                    <td>{loc.state}</td>
                    <td>{loc.city}</td>
                    <td>{loc.address}</td>
                    <td>{loc.created_by}</td>
                    <td>{loc.status === 1 ? 
                      <span className="text text-success">enabled</span> : <span className="text text-danger">disabled</span>}</td>
                    <td>
                    <button
                        className="btn btn-link btn-sm"
                        onClick={this.editLocation.bind(this, loc.id)}
                    >
                        <i className="fa fa-edit"></i>
                    </button>
                    <button
                        className="btn btn-link btn-sm text-success"
                        onClick={this.addUser.bind(this, loc.id)}
                    >
                        <i className="fa fa-plus"></i> <i className="fa fa-user"></i>
                    </button>
                    </td>
                </tr>
                )
            )
        }
        else{
          locationList = <td colSpan="5" className="text text-danger">You have no location records to display...</td>
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
                <div className="bg-info text-light p-2 mb-3">
                To create a <b>New User</b> locate the Location from the list below and click the <i className="fa fa-plus"></i> <i className="fa fa-user"></i> icon at the right. <b>Note: Users are created under locations</b>
                </div>
                <Link to="/create-location" className="btn btn-primary float-right">
                    <i className="fa fa-plus"></i> Location
                </Link>
            </div>

            <div className="col-md-12 mt-3">
                <table className="table table-hover table-responsive borderless">
                    <tbody>
                        <tr className="text text-success">
                            <td>Bank</td>
                            <td>State</td>
                            <td>City</td>
                            <td>Address</td>
                            <td>Added by</td>
                            <td>status</td>
                            <td />
                        </tr>
                        { locationList }
                    </tbody>
                </table>
            </div>
          </div>

          
      </div>
    );
  }
}

Locations.propTypes = {
  getAllLocations: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  location: state.location
});

export default connect(mapStateToProps, { getAllLocations })(Locations);
