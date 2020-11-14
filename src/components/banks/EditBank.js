import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBank, updateBank } from '../../actions/bankActions';

import Spinner from '../common/Spinner';

export class EditBank extends Component {

  constructor(){
      super();
      this.state = {
          bankname: '',
          bankcode: '',
          otherinfo: '',
          errors: {}
      }

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    
    const bankid = this.props.location.bnkid;

    this.props.getBank(bankid, this.props.auth.user.usertype);
    
  }


  UNSAFE_componentWillReceiveProps(nextProps){

    if(nextProps.bank.bank){
        const bank = nextProps.bank.bank;

        this.setState({
            bankname: bank.bankname,
            bankcode: bank.bankcode,
            otherinfo: bank.otherinfo
        });
    }
  }


  onSubmit(e){
      e.preventDefault();
    
      const bankid = this.props.bank.bank.id;
      const userRole = this.props.auth.user.usertype;

      const bankData = {
        bankname: this.state.bankname,
        bankcode: this.state.bankcode,
        otherinfo: this.state.otherinfo
      }

      this.props.updateBank(bankid, userRole, bankData, this.props.history);

  }

  onChange(e){
    this.setState({ [e.target.name] : e.target.value })
  }


  render() {

    const { bank, loading } = this.props.bank;

    let editBankForm;

    if(bank === null || loading) {
        editBankForm = <Spinner />
    }
    else{
        if(Object.keys(bank).length > 0){

            editBankForm = (
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control form-control-md" 
                        placeholder="Bank name" 
                        name="bankname" 
                        value={this.state.bankname}
                        onChange={this.onChange}
                    />
                    </div>
                    <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control form-control-md" 
                        placeholder="Bank code" 
                        name="bankcode" 
                        value={this.state.bankcode}
                        onChange={this.onChange}
                    />
                    </div>

                    <div className="form-group">
                        <textarea 
                          name="otherinfo"
                          placeholder="Other Information"
                          className="form-control form-control-md"
                          value={this.state.otherinfo}
                          onChange={this.onChange}
                        ></textarea>
                    </div>
                    
                    <input 
                        type="submit" 
                        className="btn btn-info btn-block mt-4" 
                        value="Update Bank" 
                    />
                </form>
            )
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
                <Link to="/banks" className="btn btn-primary float-right">
                    <i className="fa fa-search"></i> Banks
                </Link>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <span className="text text-primary">
                    {bank ? bank.message : ''}
                </span>
                {editBankForm}
            </div>
            <div className="col-md-3"></div>
          </div>
      </div>
    );
  }
}

EditBank.propTypes = {
  getBank: PropTypes.func.isRequired,
  updateBank: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  bank: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  bank: state.bank,
  error: state.errors
});

export default connect(mapStateToProps, { getBank, updateBank })(withRouter(EditBank));
