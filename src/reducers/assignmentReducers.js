import { GET_ASSIGNMENTS, PROFILE_LOADING } from '../actions/types';


const initialState = {
    assignment: null,
    assignments: null,
    loading: false
};

export default function (state = initialState, action){
    switch(action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_ASSIGNMENTS:
            return {
                ...state,
                assignments: action.payload,
                loading: false
            }
        default:
            return state;
    }
}