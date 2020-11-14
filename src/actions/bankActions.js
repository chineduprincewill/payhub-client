import axios from 'axios';

import { GET_BANK, GET_BANKS, PROFILE_LOADING, GET_ERRORS, UPDATE_SUCCESS } from './types';

// Get all banks
export const getAllBanks = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/bank')
        .then(res => 
            dispatch({
                type: GET_BANKS,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_BANKS,
                payload: {}
            })
        );
}


// Create new bank
export const newBank = (bankData, userRole, history) => dispatch => {

    axios
        .post(`/api/bank/${userRole}`, bankData)
        .then(res => history.push('/banks'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
        );
}


// Edit Bank
export const getBank = (bankid, role) => dispatch => {
    axios
        .get(`/api/bank/${bankid}/${role}`)
        .then(res => 
                dispatch({
                    type: GET_BANK,
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

// Update Bank
export const updateBank = (bankid, userRole, updateData, history) => dispatch => {

    axios
        .put(`/api/bank/${bankid}/${userRole}`, updateData)
        .then(res => history.push('/banks'))
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