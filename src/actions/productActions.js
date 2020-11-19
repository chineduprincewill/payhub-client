import axios from 'axios';
import configData from '../utils/config.json';

import { GET_PRODUCTS, GET_PRODUCT, PROFILE_LOADING, GET_ERRORS } from './types';

const url = configData.SERVER_URL;

// Get all banks
export const getAllProducts = (userRole) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`${url}/api/product/${userRole}`)
        .then(res => 
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_PRODUCTS,
                payload: {}
            })
        );
}


export const newProduct = (productData, userRole, history) => dispatch => {

    axios
        .post(`${url}/api/product/${userRole}`, productData)
        .then(res => history.push('/products'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            })
        );
}


// Edit Product
export const getProduct = (prodid, role) => dispatch => {
    axios
        .get(`${url}/api/product/${prodid}/${role}`)
        .then(res => 
                dispatch({
                    type: GET_PRODUCT,
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



// Update Product
export const updateProduct = (prodid, userRole, updateData, history) => dispatch => {

    axios
        .put(`${url}/api/product/${prodid}/${userRole}`, updateData)
        .then(res => history.push('/products'))
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