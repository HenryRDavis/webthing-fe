import { combineReducers } from 'redux';
import { authentication } from './authReducer.reducer';
import { registration } from './reducers.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
});

export default rootReducer;