import axios from 'axios';

import { GET_ASSIGNMENTS, PROFILE_LOADING, GET_ERROR } from './types';

// Get all banks
export const getAllAssignments = (userRole) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`/api/assignment/${userRole}`)
        .then(res => 
            dispatch({
                type: GET_ASSIGNMENTS,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ASSIGNMENTS,
                payload: {}
            })
        );
}


// Add new assignment
// Create new location
export const addAssignment = ( userRole, assignData, history) => dispatch => {

    axios
        .post(`/api/assignment/${userRole}`, assignData)
        .then(res => history.push('/assignments'))
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