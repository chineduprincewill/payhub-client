import { GET_PAYMENTS, GET_PAYMENT, PROFILE_LOADING } from '../actions/types';

const initialState = {
    payment: null,
    payments: null,
    loading: false
};

function paymentReducer (state = initialState, action){
    switch(action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_PAYMENTS:
            return {
                ...state,
                payments: action.payload,
                loading: false
            }
        case GET_PAYMENT:
            return {
                ...state,
                payment: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default paymentReducer;