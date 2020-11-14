import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAllInstitutions } from '../../actions/institutionActions';
import { newProduct } from '../../actions/productActions';

import Spinner from '../common/Spinner';

export class AddProduct extends Component {

  constructor(){
      super();
      this.state = {
          institution: '',
          product: '',
          code: '',
          description: '',
          amount: '',
          errors: {}
      }

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){

      this.props.getAllInstitutions(this.props.auth.user.usertype);
  }

  onSubmit(e){
    e.preventDefault();

    const productData = {
      institution: this.state.institution,
      product: this.state.product,
      code: this.state.code,
      description: this.state.description,
      amount: this.state.amount,
      created_by: this.props.auth.user.email,
      status: 1
    }

    this.props.newProduct(productData, this.props.auth.user.usertype, this.props.history);
  }

  onChange(e){
    this.setState({ [e.target.name] : e.target.value })
  }

  render() {

    const { institution, product, code, description, amount } = this.state;

    const { institutions, loading } = this.props.institution;

    let listInstitutions;

    if(institutions === null || loading) {
      listInstitutions = <Spinner />
    }
    else{
      if(Object.keys(institutions).length > 0){

          const data = Array.from(institutions);

          listInstitutions = data.map(inst => (
            <option key={inst.id} value={inst.institution}>{inst.institution}</option>
          ));
      }
    }

    return (
      <div className="container">
          <div className="row">
              <div className="col-md-12 border-bottom">
                <span className="display-4">Products</span>
                <Link to="/dashboard" className="btn btn-link float-right mt-4"><i className="fa fa-dashboard"></i> Dashboard</Link>
              </div>

              <div className="col-md-12 mt-5">
                <Link to="/products" className="btn btn-primary float-right">
                    <i className="fa fa-search"></i> Products
                </Link>
            </div>
          </div>

          <div className="row mt-3">
              <div className="col-md-3"></div>
              <div className="col-md-6">

              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <select 
                    className="form-control"
                    name="institution"
                    value={institution}
                    onChange={this.onChange}
                  >
                    <option value="">--Select Institution--</option>
                    { listInstitutions }
                  </select>
                </div>

                <div className="form-group">
                  <input 
                      type="text" 
                      className="form-control form-control-md" 
                      placeholder="Product name" 
                      name="product" 
                      value={product}
                      onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <input 
                      type="text" 
                      className="form-control form-control-md" 
                      placeholder="Product Code" 
                      name="code" 
                      value={code}
                      onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                    <textarea 
                      name="description"
                      placeholder="Product description"
                      className="form-control form-control-md"
                      value={description}
                      onChange={this.onChange}
                    ></textarea>
                </div>

                <div className="form-group">
                  <input 
                      type="text" 
                      className="form-control form-control-md" 
                      placeholder="Amount" 
                      name="amount" 
                      value={amount}
                      onChange={this.onChange}
                  />
                </div>

                <input 
                    type="submit" 
                    className="btn btn-info btn-block mt-4" 
                    value="Add Product" 
                />
                </form>
              </div>
              <div className="col-md-3"></div>
          </div>
          
      </div>
    );
  }
}

AddProduct.propTypes = {
  getAllInstitutions: PropTypes.func.isRequired,
  newProduct: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  institution: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  institution: state.institution
});

export default connect(mapStateToProps, { getAllInstitutions, newProduct })(withRouter(AddProduct));
