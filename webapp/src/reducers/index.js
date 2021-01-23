import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import customerReducer from './customerReducer'

export default combineReducers({
    auth: authReducer,
    customers: customerReducer,
    form: formReducer
});