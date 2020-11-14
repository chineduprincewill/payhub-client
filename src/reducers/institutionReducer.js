import { GET_INSTITUTIONS, GET_INSTITUTION, PROFILE_LOADING } from '../actions/types';


const initialState = {
    institution: null,
    institutions: null,
    loading: false
};

export default function (state = initialState, action){
    switch(action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_INSTITUTIONS:
            return {
                ...state,
                institutions: action.payload,
                loading: false
            }
        case GET_INSTITUTION:
            return {
                ...state,
                institution: action.payload,
                loading: false
            }
        default:
            return state;
    }
}