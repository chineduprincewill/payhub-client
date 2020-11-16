import { GET_BANK, GET_BANKS, PROFILE_LOADING, UPDATE_SUCCESS } from '../actions/types';


const initialState = {
    bank: null,
    banks: null,
    loading: false,
    message: ''
};

function bankReducer (state = initialState, action){
    switch(action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_BANK:
            return {
                ...state,
                bank: action.payload,
                loading: false
            }
        case GET_BANKS:
            return {
                ...state,
                banks: action.payload,
                bank: null,
                loading: false
            }
        case UPDATE_SUCCESS:
            return {
                ...state,
                message: action.payload
            }
        default:
            return state;
    }
}

export default bankReducer;