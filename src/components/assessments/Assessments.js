import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllAssessments } from '../../actions/assessmentActions';
import Spinner from '../common/Spinner';

export class Assessments extends Component {

  componentDidMount(){

    const { user } = this.props.auth;

    this.props.getAllAssessments(user.usertype, user.bank);
  }

  render() {

    const { assessments, loading } = this.props.assessment;
    const { user } = this.props.auth;

    let assessmentList;

    if(assessments === null || loading) {
        assessmentList = <Spinner />
    }
    else{
        if(Object.keys(assessments).length > 0){
            const data = Array.from(assessments);

            assessmentList = data.map(assess => (
                <tr key={assess.id}>                      
                    <td>{assess.institution}</td>
                    <td>{assess.assessment_ref}</td>
                    <td>{assess.transaction_ref}</td>
                    <td>{assess.product_identifier}</td>
                    <td>{assess.product}</td>
                    <td>{assess.code}</td>
                    <td>&#8358;{assess.amount}</td>
                    <td>{assess.customer_othernames} {assess.customer_firstname} {assess.customer_lastname}</td>
                    <td>{assess.customer_mobile}</td>
                    <td>{assess.processing_agent}</td>
                    <td>{assess.payment_status === 1 ? <span className="text text-success">paid</span> : <span className="text text-warning">pending...</span>}</td>
                </tr>
                )
            )
        }
        else{
            assessmentList = <td colSpan="5" className="text text-danger">You have no assessment records to display...</td>
        }
    }

    return (
      <div className="container">
          <div className="row">
              <div className="col-md-12 border-bottom">
                <span className="display-4">Assessments</span>
                <Link to="/dashboard" className="btn btn-link float-right mt-4"><i className="fa fa-dashboard"></i> Dashboard</Link>
              </div>

              <div className="col-md-12 mt-5">
                { user.usertype === 'teller' ? 
                    <Link to="/verify" className="btn btn-primary float-right">
                        <i className="fa fa-search"></i> Verify Assessment Reference
                    </Link> : ''}
            </div>

            <div className="col-md-12 mt-3">
                <table className="table table-hover table-responsive borderless">
                    <tbody>
                        <tr className="text text-success">
                            <td>Institution</td>
                            <td>Assessment Ref</td>
                            <td>Transaction Ref</td>
                            <td>Group</td>
                            <td>Product</td>
                            <td>Code</td>
                            <td>Amount</td>
                            <td>Customer</td>
                            <td>Mobile</td>
                            <td>Added by</td>
                            <td>status</td>
                        </tr>
                        { assessmentList }
                    </tbody>
                </table>
            </div>
          </div>

          
      </div>
    );
  }
}

Assessments.propTypes = {
  getAllAssessments: PropTypes.func.isRequired,
  assessment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  assessment: state.assessment
});

export default connect(mapStateToProps, { getAllAssessments })(Assessments);