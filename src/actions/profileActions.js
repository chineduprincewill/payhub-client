import axios from 'axios';
import configData from '../utils/config.json';

import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING, GET_ERROR, CLEAR_CURRENT_PROFILE } from './types';

const url = configData.SERVER_URL;

// Get currrent profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`${url}/api/user`)
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        );
}


// Get all profiles
export const getAllProfiles = (userRole, office) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`${url}/api/users/${userRole}/${office}`)
        .then(res => 
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_PROFILES,
                payload: {}
            })
        );
}


// Create new user
export const newUser = (userData, userRole, history) => dispatch => {

    axios
        .post(`${url}/api/register/${userRole}`, userData)
        .then(res => history.push('/users'))
        .catch(err => 
            dispatch({
                type: GET_ERROR,
                payload: err.response
            })
        );
}


// Get User
export const getUser = (userid) => dispatch => {

    axios
        .get(`${url}/api/users/${userid}`)
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERROR,
                payload: err.response
            })
        );
}


export const updateUser = (userid, role, office, userData) => dispatch => {

    axios
        .put(`${url}/api/users/${userid}/${role}/${office}`, userData)
        .then( res => 
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERROR,
                payload: err.response
            })
        );
}


// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}


// Clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};