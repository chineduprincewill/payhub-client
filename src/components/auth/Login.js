import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authAction';
import Spinner from '../common/Spinner';

class Login extends Component {

    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: [],
            isClicked: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }

        if(nextProps.errors){
            this.setState({errors: nextProps.errors.error.data, isClicked: false});
        }
    }

    onSubmit(e){
        e.preventDefault();

        this.setState({
            isClicked: true
        });

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData);

        //console.log(user);
    }

    onChange(e){
        this.setState({ [e.target.name] : e.target.value })
    }

  render() {

    const { errors, isClicked } = this.state;    

    
    let clickStatus;

    if(isClicked){
        clickStatus = <Spinner />
    }
    else{
        clickStatus = (
            <input 
                type="submit" 
                className="btn btn-info btn-block mt-4" 
                value="Sign in" 
            />
        );
    }

    return (
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Log In</h1>
                    <p className="lead text-center text-danger">
                        { errors ? errors.error : '' }
                    </p>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                        <input 
                            type="email" 
                             className="form-control form-control-lg" 
                            placeholder="Email Address" 
                            name="email" 
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                        </div>
                        <div className="form-group">
                        <input 
                            type="password" 
                            className="form-control form-control-lg" 
                            placeholder="Password" 
                            name="password" 
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                        </div>
                        {clickStatus}
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToPorps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToPorps, { loginUser })(Login);
