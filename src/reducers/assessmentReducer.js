import { GET_ASSESSMENTS, PROFILE_LOADING } from '../actions/types';

const initialState = {
    assessment: null,
    assessments: null,
    loading: false
};

export default function (state = initialState, action){
    switch(action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_ASSESSMENTS:
            return {
                ...state,
                assessments: action.payload,
                loading: false
            }
        default:
            return state;
    }
}