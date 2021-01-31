import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import customerReducer from './customerReducer'
import kegReducer from './kegReducer'
import brewReducer from  './brewReducer'

export default combineReducers({
    auth: authReducer,
    customers: customerReducer,
    kegs: kegReducer,
    brews: brewReducer,
    form: formReducer
});