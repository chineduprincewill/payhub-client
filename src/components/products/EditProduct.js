import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProduct, updateProduct } from '../../actions/productActions';
import { getAllInstitutions } from '../../actions/institutionActions';

import Spinner from '../common/Spinner';

export class EditProduct extends Component {

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
    
    const prodid = this.props.location.prodid;

    this.props.getProduct(prodid, this.props.auth.user.usertype);

    this.props.getAllInstitutions(this.props.auth.user.usertype);
    
  }


  UNSAFE_componentWillReceiveProps(nextProps){

    if(nextProps.product.product){
        const product = nextProps.product.product;

        this.setState({
            institution: product.institution,
            product: product.product,
            code: product.code,
            description: product.description,
            amount: product.amount
        });
    }
  }


  onSubmit(e){
      e.preventDefault();
    
      const prodid = this.props.product.product.id;
      const userRole = this.props.auth.user.usertype;

      const productData = {
        institution: this.state.institution,
        product: this.state.product,
        code: this.state.code,
        description: this.state.description,
        amount: this.state.amount
      }

      this.props.updateProduct(prodid, userRole, productData, this.props.history);

  }

  onChange(e){
    this.setState({ [e.target.name] : e.target.value })
  }


  render() {

    const { institution, product, code, description, amount } = this.state;

    let editProductForm;
    let listInstitutions;

    if(this.props.institution.institutions === null || this.props.institution.loading) {
        listInstitutions = <Spinner />
      }
      else{
        if(Object.keys(this.props.institution.institutions).length > 0){
  
            const data = Array.from(this.props.institution.institutions);
  
            listInstitutions = data.map(inst => (
              <option key={inst.id} value={inst.institution}>{inst.institution}</option>
            ));
        }
      }

    if(this.props.product.product === null || this.props.product.loading) {
        editProductForm = <Spinner />
    }
    else{
        if(Object.keys(this.props.product.product).length > 0){

            editProductForm = (
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <select 
                    className="form-control"
                    name="institution"
                    value={institution}
                    onChange={this.onChange}
                  >
                    <option value={institution}>{institution}</option>
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
                    value="Update Product" 
                />
                </form>
            )
        }
    }

    return (
      <div className="container">
          <div className="row">
              <div className="col-md-12 border-bottom">
                <span className="display-4">Product</span>
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
                <span className="text text-primary">
                </span>
                {editProductForm}
            </div>
            <div className="col-md-3"></div>
          </div>
      </div>
    );
  }
}

EditProduct.propTypes = {
    getProduct: PropTypes.func.isRequired,
    updateProduct: PropTypes.func.isRequired,
    getAllInstitutions: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    institution: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  product: state.product,
  institution: state.institution,
  error: state.errors
});

export default connect(mapStateToProps, { getProduct, getAllInstitutions, updateProduct })(withRouter(EditProduct));
