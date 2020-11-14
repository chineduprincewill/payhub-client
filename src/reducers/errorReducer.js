import { GET_ERRORS, GET_ERROR } from '../actions/types';

const initialState = {
    error: []
};

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_ERRORS:
            return action.payload
        case GET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}