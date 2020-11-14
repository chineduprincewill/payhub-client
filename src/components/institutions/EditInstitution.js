import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getInstitution, updateInstitution } from '../../actions/institutionActions';

import Spinner from '../common/Spinner';

export class EditInstitution extends Component {

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

  componentDidMount(){
    
    const instid = this.props.location.instid;

    this.props.getInstitution(instid, this.props.auth.user.usertype);
    
  }


  UNSAFE_componentWillReceiveProps(nextProps){

    if(nextProps.institution.institution){
        const institution = nextProps.institution.institution;

        this.setState({
            institution: institution.institution,
            accesskey: institution.accesskey,
            api: institution.api
        });
    }
  }


  onSubmit(e){
      e.preventDefault();
    
      const instid = this.props.institution.institution.id;
      const userRole = this.props.auth.user.usertype;

      const institutionData = {
        institution: this.state.institution,
        accesskey: this.state.accesskey,
        api: this.state.api
      }

      this.props.updateInstitution(instid, userRole, institutionData, this.props.history);

  }

  onChange(e){
    this.setState({ [e.target.name] : e.target.value })
  }


  render() {

    //const { institution, loading } = this.props.institution;
    const { institution, accesskey, api } = this.state;

    let editInstitutionForm;

    if(this.props.institution.institution === null || this.props.institution.loading) {
        editInstitutionForm = <Spinner />
    }
    else{
        if(Object.keys(this.props.institution.institution).length > 0){

            editInstitutionForm = (
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
                        value="Update Institution" 
                    />
                    </form>
            )
        }
    }

    return (
      <div className="container">
          <div className="row">
              <div className="col-md-12 border-bottom">
                <span className="display-4">Institution</span>
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
                <span className="text text-primary">
                </span>
                {editInstitutionForm}
            </div>
            <div className="col-md-3"></div>
          </div>
      </div>
    );
  }
}

EditInstitution.propTypes = {
  getInstitution: PropTypes.func.isRequired,
  updateInstitution: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  institution: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  institution: state.institution,
  error: state.errors
});

export default connect(mapStateToProps, { getInstitution, updateInstitution })(withRouter(EditInstitution));
