import axios from 'axios';

import { GET_PAYMENTS, PROFILE_LOADING, GET_ERROR } from './types';

// Get all banks
export const getPayments = (userRole, bank, email) => dispatch => {

    dispatch(setProfileLoading());
    axios.get(`https://victoriousloycefoundation.com/payhub/api/payment/${userRole}/${bank}/${email}`)
        .then(res => 
            dispatch({
                type: GET_PAYMENTS,
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