import axios from 'axios';
import configData from '../utils/config.json';

import { GET_INSTITUTIONS, GET_INSTITUTION, PROFILE_LOADING, GET_ERRORS } from './types';

const url = configData.SERVER_URL;

// Get all banks
export const getAllInstitutions = (userRole) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`${url}/api/institution/${userRole}`)
        .then(res => 
            dispatch({
                type: GET_INSTITUTIONS,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_INSTITUTIONS,
                payload: {}
            })
        );
}


// Edit Institution
export const getInstitution = (instid, role) => dispatch => {
    axios
        .get(`${url}/api/institution/${instid}/${role}`)
        .then(res => 
                dispatch({
                    type: GET_INSTITUTION,
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


// Add new institution
export const newInstitution = (instData, userRole, history) => dispatch => {

    axios
        .post(`${url}/api/institution/${userRole}`, instData)
        .then(res => history.push('/institutions'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            })
        );
}


// Update Institution
export const updateInstitution = (instid, userRole, updateData, history) => dispatch => {

    axios
        .put(`${url}/api/institution/${instid}/${userRole}`, updateData)
        .then(res => history.push('/institutions'))
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