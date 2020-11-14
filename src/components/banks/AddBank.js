import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { newBank } from '../../actions/bankActions';


export class AddBank extends Component {

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

  onSubmit(e){
      e.preventDefault();

      const bankData = {
        bankname: this.state.bankname,
        bankcode: this.state.bankcode,
        otherinfo: this.state.otherinfo
      }

      this.props.newBank(bankData, this.props.auth.user.usertype, this.props.history);

  }

  onChange(e){
    this.setState({ [e.target.name] : e.target.value })
  }

  render() {
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
                        value="Add Bank" 
                    />
                </form>
            </div>
            <div className="col-md-3"></div>
          </div>
      </div>
    );
  }
}

AddBank.propTypes = {
  newBank: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.errors
});

export default connect(mapStateToProps, { newBank })(withRouter(AddBank));
