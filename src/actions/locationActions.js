import axios from 'axios';
import configData from '../utils/config.json';

import { GET_LOCATIONS, GET_LOCATION, PROFILE_LOADING, GET_ERRORS } from './types';

const url = configData.SERVER_URL;

// Get all banks
export const getAllLocations = (userRole) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`${url}/api/location/${userRole}`)
        .then(res => 
            dispatch({
                type: GET_LOCATIONS,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_LOCATIONS,
                payload: {}
            })
        );
}


// Create new location
export const newLocation = (locationData, userRole, history) => dispatch => {

    axios
        .post(`${url}/api/location/${userRole}`, locationData)
        .then(res => history.push('/locations'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            })
        );
}



// Get bank offices
export const getBankOffices = (bank) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`${url}/api/bank-location/${bank}`)
        .then(res => 
            dispatch({
                type: GET_LOCATIONS,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_LOCATIONS,
                payload: {}
            })
        );
}


// Edit Location
export const getLocation = (locid, role) => dispatch => {
    axios
        .get(`${url}/api/location/${locid}/${role}`)
        .then(res => 
                dispatch({
                    type: GET_LOCATION,
                    payload: res.data
                })
            )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            })
        );
}



// Update Location
export const updateLocation = (locid, userRole, updateData, history) => dispatch => {

    axios
        .put(`${url}/api/location/${locid}/${userRole}`, updateData)
        .then(res => history.push('/locations'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
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