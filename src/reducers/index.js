import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import bankReducer from './bankReducer';
import creditReducer from './creditReducer';
import institutionReducer from './institutionReducer';
import assignmentReducer from './assignmentReducers';
import locationReducer from './locationReducers';
import productReducer from './productReducers';
import assessmentReducer from './assessmentReducer';
import paymentReducer from './paymentReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    bank: bankReducer,
    credit: creditReducer,
    institution: institutionReducer,
    assignment: assignmentReducer,
    location: locationReducer,
    product: productReducer,
    assessment: assessmentReducer,
    payment: paymentReducer
});