import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllAssignments } from '../../actions/assignmentActions';
import Spinner from '../common/Spinner';

export class Assignments extends Component {

  componentDidMount(){

    this.props.getAllAssignments(this.props.auth.user.usertype);
  }

  render() {

    const { assignments, loading } = this.props.assignment;

    let assignmentList;

    if(assignments === null || loading) {
      assignmentList = <Spinner />
    }
    else{
        if(Object.keys(assignments).length > 0){
            const data = Array.from(assignments);

            assignmentList = data.map(assmnt => (
                <tr key={assmnt.id}>                      
                    <td>{assmnt.institution}</td>
                    <td>{assmnt.product}</td>
                    <td>{assmnt.code}</td>
                    <td>{assmnt.bank}</td>
                    <td>&#8358;{assmnt.amount}</td>
                    <td>{assmnt.assigned_by}</td>
                    <td>{assmnt.status === 1 ? <span className="text text-success">enabled</span> : <span className="text text-danger">disabled</span>}</td>
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
          assignmentList = <td colSpan="5" className="text text-danger">You have no assignment records to display...</td>
        }
    }

    return (
      <div className="container">
          <div className="row">
              <div className="col-md-12 border-bottom">
                <span className="display-4">Assignments</span>
                <Link to="/dashboard" className="btn btn-link float-right mt-4"><i className="fa fa-dashboard"></i> Dashboard</Link>
              </div>

              <div className="col-md-12 mt-5">
                <Link to="/products" className="btn btn-primary float-right">
                    <i className="fa fa-plus"></i> Assign
                </Link>
            </div>

            <div className="col-md-12 mt-3">
                <table className="table table-hover table-responsive borderless">
                    <tbody>
                        <tr className="text text-success">
                            <td>Institution</td>
                            <td>Product</td>
                            <td>Code</td>
                            <td>Bank</td>
                            <td>Amount</td>
                            <td>Assigned by</td>
                            <td>status</td>
                            <td />
                        </tr>
                        { assignmentList }
                    </tbody>
                </table>
            </div>
          </div>

          
      </div>
    );
  }
}

Assignments.propTypes = {
  getAllAssignments: PropTypes.func.isRequired,
  assignment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  assignment: state.assignment
});

export default connect(mapStateToProps, { getAllAssignments })(Assignments);
