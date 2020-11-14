import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { newInstitution } from '../../actions/institutionActions';

export class AddInstitution extends Component {

  constructor(){
      super();
      this.state = {
          institution: '',
          accesskey: '',
          api: '',
          errors: {}
      }

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit (e) {
    e.preventDefault();

    const instData = {
      institution: this.state.institution,
      accesskey: this.state.accesskey,
      api: this.state.api,
      created_by: this.props.auth.user.email,
      status: 1
    }

    this.props.newInstitution(instData, this.props.auth.user.usertype, this.props.history);
  }


  onChange(e){
    this.setState({ [e.target.name] : e.target.value })
  }

  render() {

    const { institution, accesskey, api } = this.state;

    return (
      <div className="container">
          <div className="row">
              <div className="col-md-12 border-bottom">
                <span className="display-4">Institutions</span>
                <Link to="/dashboard" className="btn btn-link float-right mt-4"><i className="fa fa-dashboard"></i> Dashboard</Link>
              </div>

              <div className="col-md-12 mt-5">
                <Link to="/institutions" className="btn btn-primary float-right">
                    <i className="fa fa-search"></i> Institutions
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
                          placeholder="Institution name" 
                          name="institution" 
                          value={institution}
                          onChange={this.onChange}
                      />
                    </div>

                    <div className="form-group">
                      <input 
                          type="text" 
                          className="form-control form-control-md" 
                          placeholder="Access Key" 
                          name="accesskey" 
                          value={accesskey}
                          onChange={this.onChange}
                      />
                    </div>

                    <div className="form-group">
                      <input 
                          type="text" 
                          className="form-control form-control-md" 
                          placeholder="API / Endpoint" 
                          name="api" 
                          value={api}
                          onChange={this.onChange}
                      />
                    </div>

                    <input 
                        type="submit" 
                        className="btn btn-info btn-block mt-4" 
                        value="Add Institution" 
                    />
                    </form>
              </div>
              <div className="col-md-3"></div>
          </div>
      </div>
    );
  }
}

AddInstitution.propTypes = {
  newInstitution: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { newInstitution })(withRouter(AddInstitution));
