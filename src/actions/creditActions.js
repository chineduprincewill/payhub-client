import axios from 'axios';

import { GET_TRANSFERS, PROFILE_LOADING, GET_ERROR } from './types';

// Get all banks
export const getAllTransfers = (userRole, userEmail) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`https://victoriousloycefoundation.com/payhub/api/credit/${userRole}/${userEmail}`)
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
        .post('https://victoriousloycefoundation.com/payhub/api/credit', locationData)
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