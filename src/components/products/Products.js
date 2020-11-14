import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllProducts } from '../../actions/productActions';
import Spinner from '../common/Spinner';

export class Products extends Component {

  componentDidMount(){

    this.props.getAllProducts(this.props.auth.user.usertype);
  }


  editProduct = (prodid) => {

    this.props.history.push({
      pathname: '/edit-product',
      prodid:  prodid 
    });
  }


  assignProduct = (prodid) => {

    this.props.history.push({
      pathname: '/assign',
      prodid:  prodid 
    });
  }


  render() {

    const { products, loading } = this.props.product;

    let productList;

    if(products === null || loading) {
      productList = <Spinner />
    }
    else{
        if(Object.keys(products).length > 0){
            const data = Array.from(products);

            productList = data.map(prdt => (
                <tr key={prdt.id}>                      
                    <td>{prdt.institution}</td>
                    <td>{prdt.product}</td>
                    <td>{prdt.code}</td>
                    <td>{prdt.description}</td>
                    <td>&#8358;{prdt.amount}</td>
                    <td>{prdt.created_by}</td>
                    <td>{prdt.status === 1 ? <span className="text text-success">enabled</span> : <span className="text text-danger">disabled</span>}</td>
                    <td>
                    <button
                        className="btn btn-link btn-sm"
                        onClick={this.editProduct.bind(this, prdt.id)}
                    >
                        <i className="fa fa-edit"></i>
                    </button>
                    <button
                        className="btn btn-link btn-sm btn-block text-success"
                        title="assign products to processing establishments (banks)"
                        onClick={this.assignProduct.bind(this, prdt.id)}
                    >
                        <i className="fa fa-tasks"></i> 
                    </button>
                    </td>
                </tr>
                )
            )
        }
        else{
          productList = <td colSpan="5" className="text text-danger">You have no product records to display...</td>
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
              <div className="bg-info text-light p-2 mb-3">
                Products are assigned to processing <b>Banks / Establishments</b>. To assign a <b>Product</b> locate the Product from below and click the <b><i className="fa fa-tasks"></i></b> icon by the right.
                </div>
                <Link to="/create-product" className="btn btn-primary float-right">
                    <i className="fa fa-plus"></i> Product
                </Link>
            </div>

            <div className="col-md-12 mt-3">
                <table className="table table-hover table-responsive borderless">
                    <tbody>
                        <tr className="text text-success">
                            <td>Institution</td>
                            <td>Product</td>
                            <td>Code</td>
                            <td>Description</td>
                            <td>Amount</td>
                            <td>Added by</td>
                            <td>status</td>
                            <td />
                        </tr>
                        { productList }
                    </tbody>
                </table>
            </div>
          </div>

          
      </div>
    );
  }
}

Products.propTypes = {
  getAllProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  product: state.product
});

export default connect(mapStateToProps, { getAllProducts })(Products);