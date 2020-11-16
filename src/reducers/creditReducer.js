import { GET_TRANSFER, GET_TRANSFERS, PROFILE_LOADING } from '../actions/types';


const initialState = {
    transfer: null,
    transfers: null,
    loading: false
};

function creditReducer (state = initialState, action){
    switch(action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_TRANSFER:
            return {
                ...state,
                transfer: action.payload,
                loading: false
            }
        case GET_TRANSFERS:
            return {
                ...state,
                transfers: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default creditReducer;