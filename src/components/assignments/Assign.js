import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getProduct } from '../../actions/productActions';
import { getAllBanks } from '../../actions/bankActions';
import { addAssignment } from '../../actions/assignmentActions';
import Spinner from  '../common/Spinner';

export class Assign extends Component {

  constructor(){
    super();
    this.state = {
        institution: '',
        product: '',
        code: '',
        bank: '',
        amount: '',
        isClicked: false,
        errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}

componentDidMount(){

    const prodid = this.props.location.prodid;

    this.props.getProduct(prodid, this.props.auth.user.usertype);

    this.props.getAllBanks();
  }


  UNSAFE_componentWillReceiveProps(nextProps){

    if(nextProps.product.product){
        const product = nextProps.product.product;

        this.setState({
            institution: product.institution,
            product: product.product,
            code: product.code,
            amount: product.amount
        });
    }

    if(nextProps.errors){
        this.setState({errors: nextProps.errors.error, isClicked: false});
    }
  }


  onSubmit(e){
    e.preventDefault();

    this.setState({
      isClicked: true
    });

    const assignData = {
      institution: this.state.institution,
      product: this.state.product,
      code: this.state.code,
      bank: this.state.bank,
      amount: this.state.amount,
      assigned_by: this.props.auth.user.email,
      status: 1
    }

    this.props.addAssignment(this.props.auth.user.usertype, assignData, this.props.history);
  }


  onChange(e){
    this.setState({ [e.target.name] : e.target.value })
  }


  render() {

    const { bank, isClicked } = this.state;
    const { product, loading } = this.props.product;

    let listBanks;
    let assignProductForm;


    let clickStatus;

    if(isClicked){
        clickStatus = <Spinner />
    }
    else{
        clickStatus = (
            <input 
                type="submit" 
                className="btn btn-info btn-block mt-4" 
                value="Assign Product" 
            />
        );
    }


    if(this.props.bank.banks === null || this.props.bank.loading) {
      listBanks = <Spinner />
    }
    else{
        if(Object.keys(this.props.bank.banks).length > 0){

            const data = Array.from(this.props.bank.banks);

            listBanks = data.map(bnk => (
            <option key={bnk.id} value={bnk.bankname}>{bnk.bankname}</option>
            ));
        }
    }


    if(product === null || loading) {
        assignProductForm = <Spinner />
    }
    else{
        if(Object.keys(product).length > 0){

          assignProductForm = (
                <form onSubmit={this.onSubmit}>

                  <p className="text text-primary p-2">{this.state.institution}</p>
                  <p className="text text-primary p-2">{this.state.product}</p>
                  <p className="text text-primary p-2">{this.state.code}</p>
                  <p className="text text-primary p-2">&#8358;{this.state.amount}</p>
                
                  <div className="form-group p-2">
                    <select 
                      className="form-control"
                      name="bank"
                      value={bank}
                      onChange={this.onChange}
                    >
                      <option value="">--Select Bank--</option>
                      { listBanks }
                    </select>
                  </div>

                  {clickStatus}
                </form>
            )
        }
    }

    return (
      <div className="container">
          <div className="row">
              <div className="col-md-12 border-bottom">
                <span className="display-4">Assignments</span>
                <Link to="/dashboard" className="btn btn-link float-right mt-4"><i className="fa fa-dashboard"></i> Dashboard</Link>
              </div>

              <div className="col-md-12 mt-5">
                <Link to="/assignments" className="btn btn-primary float-right">
                    <i className="fa fa-search"></i> Assignments
                </Link>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <span className="text text-primary">
                </span>
                {assignProductForm}
            </div>
            <div className="col-md-3"></div>
          </div>

          
      </div>
    );
  }
}

Assign.propTypes = {
    getProduct: PropTypes.func.isRequired,
    getAllBanks: PropTypes.func.isRequired,
    addAssignment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    bank: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    product: state.product,
    bank: state.bank,
    errors: state.errors.error
});

export default connect(mapStateToProps, { getProduct, getAllBanks, addAssignment })(Assign);
