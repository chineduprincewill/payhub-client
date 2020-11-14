import { GET_PRODUCTS, GET_PRODUCT, PROFILE_LOADING } from '../actions/types';

const initialState = {
    product: null,
    products: null,
    loading: false
};

export default function (state = initialState, action){
    switch(action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            }
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload,
                loading: false
            }
        default:
            return state;
    }
}