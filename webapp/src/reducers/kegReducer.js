import _ from 'lodash'
import {
    CREATE_KEG,
    FETCH_KEG,
    FETCH_KEGS,
    DELETE_KEG,
    EDIT_KEG
} from './../actions/types'

const kegReducer = (state = {}, action) => {
    switch(action.type) {
        case CREATE_KEG:
            return {...state, [action.payload.id]: action.payload};
        case EDIT_KEG: 
            return {...state, [action.payload.id]: action.payload};
        case FETCH_KEG:
            return {...state, [action.payload.id]: action.payload};       
        case FETCH_KEGS:
            return {...state, ..._.mapKeys(action.payload,'id')};
        case DELETE_KEG:
            return _.omit(state,action.payload)
        default:
            return state;
    }
};

export default kegReducer;