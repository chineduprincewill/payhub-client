import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPayments } from '../../actions/paymentActions';
import Spinner from '../common/Spinner';


class Payments extends Component {


    componentDidMount(){

        const { usertype, bank, email } = this.props.auth.user;

        this.props.getPayments(usertype, bank, email);
    }


  render() {


    const { payments, loading } = this.props.payment;
    const { user } = this.props.auth;

    let paymentList;

    if(payments === null || loading) {
        paymentList = <Spinner />
    }
    else{
        if(Object.keys(payments).length > 0){
            const data = Array.from(payments);

            paymentList = data.map(pmt => (
                <tr key={pmt.id}>   
                    <td>{pmt.CustReference}</td>                   
                    <td>{pmt.FeeName}</td>
                    <td>{pmt.InstitutionName}</td>
                    <td>&#8358;{pmt.Amount}</td>
                    <td>{pmt.CustomerName}</td>
                    <td>{pmt.BankName}</td>
                    <td>{pmt.BranchName}, {pmt.Location}</td>
                    <td>{pmt.DepositorName}</td>
                    <td>{pmt.created_at}</td> </tr>
                )
            )
        }
        else{
            paymentList = <td colSpan="5" className="text text-danger">You have no payment records to display...</td>
        }
    }


    return (
      <div className="container">
          <div className="row">
             <div className="col-md-12 border-bottom">
                <span className="display-4">Payments</span>
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
                            <td>Transaction Ref</td>
                            <td>Product</td>
                            <td>Institution</td>
                            <td>Amount</td>
                            <td>Customer</td>
                            <td>Bank</td>
                            <td>Branch</td>
                            <td>Teller</td>
                            <td>Date</td>
                        </tr>
                        { paymentList }
                    </tbody>
                </table>
            </div>

          </div>
      </div>
    );
  }
}

Payments.propTypes = {
    getPayments: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    payment: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    payment: state.payment
});

export default connect(mapStateToProps, { getPayments })(Payments);
