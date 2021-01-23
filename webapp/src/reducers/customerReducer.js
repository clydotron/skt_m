import _ from 'lodash'
import {
    CREATE_CUSTOMER,
    FETCH_CUSTOMER,
    FETCH_CUSTOMERS,
    DELETE_CUSTOMER,
    EDIT_CUSTOMER
} from './../actions/types'

const customerReducer = (state = {}, action) => {
    switch(action.type) {
        case CREATE_CUSTOMER:
            return {...state, [action.payload.id]: action.payload};
        case EDIT_CUSTOMER: 
            return {...state, [action.payload.id]: action.payload};
        case FETCH_CUSTOMER:
            return {...state, [action.payload.id]: action.payload};       
        case FETCH_CUSTOMERS:
            return {...state, ..._.mapKeys(action.payload,'id')};
        case DELETE_CUSTOMER:
            return _.omit(state,action.payload)
        default:
            return state;
    }
};

export default customerReducer;