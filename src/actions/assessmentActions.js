import axios from 'axios';
import configData from '../utils/config.json';

import { GET_ASSESSMENTS, PROFILE_LOADING, GET_ERROR } from './types';

const url = configData.SERVER_URL;

// Get all banks
export const getAllAssessments = (userRole, bank) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`${url}/api/assessment/${userRole}/${bank}`)
        .then(res => 
            dispatch({
                type: GET_ASSESSMENTS,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERROR,
                payload: {}
            })
        );
}


// Get Assessment Ref assessments
export const getAssessment = (userRole, userId, assRef) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`${url}/api/verification/${assRef}/${userRole}/${userId}`)
        .then(res => 
            dispatch({
                type: GET_ASSESSMENTS,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ASSESSMENTS,
                payload: err.response
            })
        );
}


// Post customer assessment
export const completePayment = (userRole, paymentData) => dispatch => {

    dispatch(setProfileLoading());
    axios.post(`${url}/api/payment/${userRole}`, paymentData)
        .then(res => 
            dispatch({
                type: GET_ASSESSMENTS,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ASSESSMENTS,
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