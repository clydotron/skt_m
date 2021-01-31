import _ from 'lodash'
import {
    CREATE_BREW,
    FETCH_BREW,
    FETCH_BREWS,
    DELETE_BREW,
    EDIT_BREW
} from './../actions/types'

const brewReducer = (state = {}, action) => {
    switch(action.type) {
        case CREATE_BREW:
            return {...state, [action.payload.id]: action.payload};
        case EDIT_BREW: 
            return {...state, [action.payload.id]: action.payload};
        case FETCH_BREW:
            return {...state, [action.payload.id]: action.payload};       
        case FETCH_BREWS:
            return {...state, ..._.mapKeys(action.payload,'id')};
        case DELETE_BREW:
            return _.omit(state,action.payload)
        default:
            return state;
    }
};

export default brewReducer;