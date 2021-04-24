import { combineReducers } from 'redux';
import { authentication } from './autheReducer.reducer';
import { registration } from './reducers.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
});

export default rootReducer;