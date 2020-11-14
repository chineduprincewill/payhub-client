import axios from 'axios';

import { SEND_TRANSFER, GET_TRANSFERS, PROFILE_LOADING, GET_ERROR } from './types';

// Get all banks
export const getAllTransfers = (userRole, userEmail) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`/api/credit/${userRole}/${userEmail}`)
        .then(res => 
            dispatch({
                type: GET_TRANSFERS,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_TRANSFERS,
                payload: {}
            })
        );
}


// Make transfer 
export const makeTransfer = (locationData, history) => dispatch => {

    axios
        .post('/api/credit', locationData)
        .then(res => history.push('/credits'))
        .catch(err => 
            dispatch({
                type: GET_ERROR,
                payload: {}
            })
        )
}


// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}