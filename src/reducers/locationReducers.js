import { GET_LOCATIONS, GET_LOCATION, PROFILE_LOADING } from '../actions/types';


const initialState = {
    location: null,
    locations: null,
    loading: false
};

export default function (state = initialState, action){
    switch(action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_LOCATIONS:
            return {
                ...state,
                locations: action.payload,
                loading: false
            }
        case GET_LOCATION:
            return {
                ...state,
                location: action.payload,
                loading: false
            }
        default:
            return state;
    }
}