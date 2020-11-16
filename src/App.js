import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authAction';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';

import Users from './components/users/Users';
import UserLocation from './components/users/UserLocation';

import Banks from './components/banks/Banks';
import AddBank from './components/banks/AddBank';
import EditBank from './components/banks/EditBank';

import Credits from './components/credits/Credits';
import TransferCredit from './components/credits/TransferCredit';

import Institutions from './components/institutions/Institutions';
import AddInstitution from './components/institutions/AddInstitution';
import EditInstitution from './components/institutions/EditInstitution';

import Assignments from './components/assignments/Assignments';
import Assign from './components/assignments/Assign';

import Locations from './components/locations/Locations';
import AddLocation from './components/locations/AddLocation';
import EditLocation from './components/locations/EditLocation';

import Products from './components/products/Products';
import AddProduct from './components/products/AddProduct';
import EditProduct from './components/products/EditProduct';

import Assessment from './components/assessments/Assessments';

import Verify from './components/verification/Verify';

import Payments from './components/payments/Payments';

import PrivateRoute from './components/common/PrivateRoute';

import './App.css';

// Check for token
if(localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user infor and exp
  const decoded = jwt_decode(localStorage.jwtToken); 

  const userdata = JSON.parse(localStorage.userData);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(userdata));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
    // Logout user
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearCurrentProfile());

    // Redirect to login
    window.location.href = '/login'; 
  }
}

class App extends Component {
  
  render() {

    return(
      <Provider store={store}>
          <Router>
            <div className="App">
              <Navbar />
              <Route exact path="/" component={Landing} />
              <div className="container">
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  <PrivateRoute exact path="/users" component={Users} />
                  <PrivateRoute exact path="/user-location" component={UserLocation} />
                  <PrivateRoute exact path="/banks" component={Banks} />
                  <PrivateRoute exact path="/create-bank" component={AddBank} />
                  <PrivateRoute exact path="/edit-bank" component={EditBank} />
                  <PrivateRoute exact path="/credits" component={Credits} />
                  <PrivateRoute exact path="/credit-transfer" component={TransferCredit} />
                  <PrivateRoute exact path="/institutions" component={Institutions} />
                  <PrivateRoute exact path="/create-institution" component={AddInstitution} />
                  <PrivateRoute exact path="/edit-institution" component={EditInstitution} />
                  <PrivateRoute exact path="/assignments" component={Assignments} />
                  <PrivateRoute exact path="/assign" component={Assign} />
                  <PrivateRoute exact path="/locations" component={Locations} />
                  <PrivateRoute exact path="/create-location" component={AddLocation} />
                  <PrivateRoute exact path="/edit-location" component={EditLocation} />
                  <PrivateRoute exact path="/products" component={Products} />
                  <PrivateRoute exact path="/create-product" component={AddProduct} />
                  <PrivateRoute exact path="/edit-product" component={EditProduct} />
                  <PrivateRoute exact path="/assessments" component={Assessment} />
                  <PrivateRoute exact path="/verify" component={Verify} />
                  <PrivateRoute exact path="/pay" component={Payments} />
                </Switch>
              </div>
              <Footer />
            </div>
        </Router>
      </Provider>
      
      
    );
  }
}

export default App;
