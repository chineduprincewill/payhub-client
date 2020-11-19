import axios from 'axios';
import configData from '../utils/config.json';

import { GET_ASSIGNMENTS, PROFILE_LOADING, GET_ERROR } from './types';

const url = configData.SERVER_URL;

// Get all banks
export const getAllAssignments = (userRole) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`${url}/api/assignment/${userRole}`)
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
        .post(`${url}/api/assignment/${userRole}`, assignData)
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