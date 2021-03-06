import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import configData from '../utils/config.json';

import { GET_ERROR, SET_CURRENT_USER } from './types';

const url = configData.SERVER_URL;

// Login - Get User Token
export const loginUser = userData => dispatch => {
    axios
        .post(`${url}/api/login`, userData)
        .then(res => {
            // Save to localStorage
            const { token, user } = res.data;
            // Set token to ls
            const userString = JSON.stringify(user);

            localStorage.setItem('jwtToken', token);
            localStorage.setItem('userData', userString)
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            //const decoded = jwt_decode(token);
            const decoded = user;
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => 
            dispatch({
                type: GET_ERROR,
                payload: err.response
            })
        );
}

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}


// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
    localStorage.removeItem('userData');
};