import api from '../apis/api'
import history from '../history'

import { SIGN_IN, 
    SIGN_OUT,
    CREATE_CUSTOMER,
    FETCH_CUSTOMER,
    FETCH_CUSTOMERS,
    DELETE_CUSTOMER,
    EDIT_CUSTOMER,
    RETURN_KEG
} from './types'


export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

// @todo standardize the paths!!!!

export const createCustomer = (formValues) => {
    return async (dispatch, getState) => {
        const { userId } = getState().auth;
        const response = await api.post('/customers',{...formValues, userId});
        dispatch({ type: CREATE_CUSTOMER, payload: response.data });
        history.push('/customers');
    };
};

export const fetchCustomers = () => {
    return async (dispatch) => {
        const response = await api.get('/customers');
        dispatch({ type: FETCH_CUSTOMERS, payload: response.data });
    };
};

export const fetchCustomer = (id) => async dispatch => {
    const response = await api.get(`/customers/${id}`);
    dispatch({ type: FETCH_CUSTOMER, payload: response.data });
};

export const editCustomer = (id, formData) => async dispatch => {
    console.log("edit: "+id)
    const response = await api.patch(`/customers/${id}`,formData);
    dispatch({ type: EDIT_CUSTOMER, payload: response.data });
    history.push('/customers');
};

export const deleteCustomer = (id) => async dispatch => {
    await api.delete(`/customers/${id}`);
    dispatch({ type: DELETE_CUSTOMER, payload:id });
    history.push('/customers');
};

export const returnKeg = (id,kegId) => async dispatch => {
    console.log("returnKeg")
    const data = { kegid: kegId }
    const response = await api.post(`/customers/${id}/return`,data );
    console.log("return: ",response)
    dispatch({ type: RETURN_KEG, payload: kegId })
    history.push(`/customers/${id}`);
}