import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getAllBanks, getBank } from '../../actions/bankActions';

export class Banks extends Component {

  componentDidMount(){
    this.props.getAllBanks();
  }


  editBank = bankid => {
        
      // console.log(userid);
      //this.props.getBank(bankid, this.props.auth.user.usertype);

      //this.props.history.push('/edit-bank');

      this.props.history.push({
        pathname: '/edit-bank',
        bnkid:  bankid 
      });
  }


  render() {

    const { banks, loading } = this.props.bank;

    let bankList;

    if(banks === null || loading) {
      bankList = <Spinner />
  }
  else{
      if(Object.keys(banks).length > 0){
          const data = Array.from(banks);

          bankList = data.map(bnk => (
              <tr key={bnk.id}>                      
                  <td>{bnk.bankname}</td>
                  <td>{bnk.bankcode}</td>
                  <td>{bnk.otherinfo}</td>
                  <td>{bnk.created_at}</td>
                  <td>
                  <button
                      className="btn btn-link btn-sm"
                      onClick={this.editBank.bind(this, bnk.id)}
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
          bankList = <td colSpan="4" className="text text-danger">You have no bank to display...</td>
      }
  }

    return (
      <div className="container">
          <div className="row">
              <div className="col-md-12 border-bottom">
                <span className="display-4">Banks</span>
                <Link to="/dashboard" className="btn btn-link float-right mt-4"><i className="fa fa-dashboard"></i> Dashboard</Link>
              </div>

              <div className="col-md-12 mt-5">
                <Link to="/create-bank" className="btn btn-primary float-right">
                    <i className="fa fa-plus"></i> Bank
                </Link>
            </div>

            <div className="col-md-12 mt-1">
                <table className="table table-hover table-responsive borderless">
                    <tbody>
                        <tr className="text text-success">
                            <td>Bank</td>
                            <td>Code</td>
                            <td>Other Information</td>
                            <td>Date</td>
                            <td />
                        </tr>
                        { bankList }
                    </tbody>
                </table>
            </div>
          </div>

          
      </div>
    );
  }
}

Banks.propTypes = {
  getAllBanks: PropTypes.func.isRequired,
  getBank: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  bank: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  bank: state.bank,
  auth: state.auth
});

export default connect(mapStateToProps, { getAllBanks, getBank })(withRouter(Banks));
