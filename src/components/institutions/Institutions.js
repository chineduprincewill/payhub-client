import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllInstitutions } from '../../actions/institutionActions';
import Spinner from '../common/Spinner';


export class Institutions extends Component {

  componentDidMount(){

    this.props.getAllInstitutions(this.props.auth.user.usertype);
  }


  editInstitution = (instid) => {

    this.props.history.push({
      pathname: '/edit-institution',
      instid:  instid 
    });
  }

  render() {

    const { institutions, loading } = this.props.institution;

    let institutionList;

    if(institutions === null || loading) {
      institutionList = <Spinner />
    }
    else{
        if(Object.keys(institutions).length > 0){
            const data = Array.from(institutions);

            institutionList = data.map(inst => (
                <tr key={inst.id}>                      
                    <td>{inst.institution}</td>
                    <td>{inst.accesskey}</td>
                    <td>{inst.api}</td>
                    <td>{inst.created_by}</td>
                    <td>{inst.status === 1 ? <span className="text text-success">enabled</span> : <span className="text text-danger">disabled</span>}</td>
                    <td>
                    <button
                        className="btn btn-link btn-sm"
                        onClick={this.editInstitution.bind(this, inst.id)}
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
          institutionList = <td colSpan="5" className="text text-danger">You have no institution records to display...</td>
        }
    }

    return (
      <div className="container">
          <div className="row">
              <div className="col-md-12 border-bottom">
                <span className="display-4">Institutions</span>
                <Link to="/dashboard" className="btn btn-link float-right mt-4"><i className="fa fa-dashboard"></i> Dashboard</Link>
              </div>

              <div className="col-md-12 mt-5">
                <Link to="/create-institution" className="btn btn-primary float-right">
                    <i className="fa fa-plus"></i> Institution
                </Link>
            </div>

            <div className="col-md-12 mt-3">
                <table className="table table-hover table-responsive borderless">
                    <tbody>
                        <tr className="text text-success">
                            <td>Institution</td>
                            <td>Access Key</td>
                            <td>API / Endpoint</td>
                            <td>Created by</td>
                            <td>status</td>
                            <td />
                        </tr>
                        { institutionList }
                    </tbody>
                </table>
            </div>
          </div>

          
      </div>
    );
  }
}

Institutions.propTypes = {
  getAllInstitutions: PropTypes.func.isRequired,
  institution: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  institution: state.institution
});

export default connect(mapStateToProps, { getAllInstitutions })(Institutions);
