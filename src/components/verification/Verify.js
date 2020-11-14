import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAssessment, completePayment } from '../../actions/assessmentActions';
import Spinner from '../common/Spinner';

class Verify extends Component {

    constructor(){
        super();
        this.state = {
            assessref: '',
            isClicked: false,
            checked: false
        }
  
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();

        const { usertype, id } = this.props.auth.user;

        const assessref = this.state.assessref;

        this.props.getAssessment(usertype, id, assessref);

        //console.log(this.state.assessref);
    }


    postPayment = (assid) => {

        const { email, usertype, bank, address, city, state, id } = this.props.auth.user;

        const paymentData = {
            
            assessment_id : assid,
            email : email,
            usertype : usertype,
            bank : bank,
            address : address,
            city : city,
            state : state,
            id : id
        }

        if(this.state.checked){
            this.props.completePayment(usertype, paymentData);
        }
        else{
            
            alert('You must check the confirm checkbox before you can complete transaction');
        }
    }

    handleCheck = () => {

        this.setState({checked: !this.state.checked});
       
    }


    onChange(e){
        this.setState({ [e.target.name] : e.target.value })
      }

  render() {

    const { assessments, loading } = this.props.assessment;

    let errmsg;
    let refDetail;

    if(assessments.message){
        errmsg = assessments.message
    }
    else{
        errmsg = '';
    }


    if(assessments === null || loading) {
        refDetail = <Spinner />
    }
    else{
        if(Object.keys(assessments).length > 0){

            const data = Array.from(assessments);

            refDetail = data.map(ass => (
                <ul className="col-md-6 pt-2 list-group" key={ass.id}>                      
                    <li className="list-group-item">{ass.institution}</li>
                    <li className="list-group-item">{ass.product} ( {ass.code} )</li>
                    <li className="list-group-item">&#8358; {ass.amount}</li>
                    <li className="list-group-item"><b>Ref: </b>{ass.transaction_ref}</li>
                    <li className="list-group-item">{ass.customer_lastname} {ass.customer_firstname} {ass.customer_othernames} ({ass.customer_mobile})</li>
                    <li className="list-group-item">
                        <input 
                            className="col-1 form-control form-control-sm input-sm float-left"
                            type="checkbox" 
                            onChange={this.handleCheck} 
                            defaultChecked={this.state.checked} 
                        /> <span className="text text-danger">Check to Confirm</span>

                        <button 
                            className="btn btn-primary float-right"
                            onClick={this.postPayment.bind(this, ass.id)}
                        >
                            Complete transaction
                        </button>
                    </li>
                </ul>
                )
            )
        }
    }

    return (
      <div className="container">
        <div className="row">
            <div className="col-md-12 border-bottom">
                <span className="display-4">Verification</span>
                <Link to="/dashboard" className="btn btn-link float-right mt-4"><i className="fa fa-dashboard"></i> Dashboard</Link>
            </div>

            <div className="col-md-12 mt-3">
                <Link to="pay" className="btn btn-primary float-right">
                    <i className="fa fa-search"></i> Payments
                </Link>
            </div>

            <div className="col-md-12 mt-2 pt-3">
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control form-control-md" 
                                placeholder="Enter Assessment Reference" 
                                name="assessref" 
                                value={this.state.assessref}
                                onChange={this.onChange}
                                required
                            />
                            </div>
                        </div>
            
                        <div className="col-md-2">
                            <input 
                                type="submit" 
                                className="btn btn-info btn-block" 
                                value="Verify" 
                            />
                        </div>

                        <div className="col-md-6"></div>
                    </div>
                </form>  
            </div>

            <div className="col-md-12 row mt-2">
                <p className="text text-danger">{errmsg}</p>
                {refDetail}
            </div>
        </div>
      </div>
    );
  }
}

Verify.propTypes = {
    getAssessment: PropTypes.func.isRequired,
    completePayment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    assessment: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    assessment: state.assessment
});

export default connect(mapStateToProps, { getAssessment, completePayment })(Verify);
