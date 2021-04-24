import { combineReducers } from 'redux';
import { authentication } from './authReducer';
import { registration } from './reducers';

const rootReducer = combineReducers({
    authentication,
    registration,
});

export default rootReducer;