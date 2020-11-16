import axios from 'axios';

import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING, GET_ERROR, CLEAR_CURRENT_PROFILE } from './types';

// Get currrent profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('https://victoriousloycefoundation.com/payhub/api/user')
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
    axios.get(`https://victoriousloycefoundation.com/payhub/api/users/${userRole}/${office}`)
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
        .post(`https://victoriousloycefoundation.com/payhub/api/register/${userRole}`, userData)
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
        .get(`https://victoriousloycefoundation.com/payhub/api/users/${userid}`)
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
        .put(`https://victoriousloycefoundation.com/payhub/api/users/${userid}/${role}/${office}`, userData)
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