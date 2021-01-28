import api from '../apis/api'
import history from '../history'

import { SIGN_IN, 
    SIGN_OUT,
    CREATE_CUSTOMER,
    FETCH_CUSTOMER,
    FETCH_CUSTOMERS,
    DELETE_CUSTOMER,
    EDIT_CUSTOMER,
    RETURN_KEG,
    CREATE_KEG,
    FETCH_KEG,
    FETCH_KEGS,
    DELETE_KEG,
    EDIT_KEG,
    CREATE_BEER
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


export const createCustomer = (formValues) => {
    return async (dispatch, getState) => {
        const { userId } = getState().auth;
        const response = await api.post('/customers',{...formValues, userId, kegs: []});
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

    const data = { kegid: kegId }
    const response = await api.post(`/customers/${id}/return`,data );
    console.log("return: ",response)
    dispatch({ type: RETURN_KEG, payload: kegId })
    history.push(`/customers/${id}`); //this might not always be the case
}

// ---- KEGS

export const createKeg = (formData) => { //include getState to have the user's id
    return async (dispatch) => {
        const response = await api.post(`/kegs`,{...formData, history: []});
        dispatch({ type: CREATE_KEG, payload: response.data });
        history.push('/kegs');
    }
}

export const fetchKegs = () => {
    return async (dispatch) => {
        const response = await api.get("/kegs")
        dispatch({ type: FETCH_KEGS, payload: response.data });
    };
}

export const fetchKeg = (id) => {
    return async (dispatch) => {
        const response = await api.get(`/kegs/${id}`);
        dispatch({ type: FETCH_KEG, payload: response.data });
    };
}

export const editKeg = (id, formData) => async dispatch => {
    const response = await api.patch(`/kegs/${id}`,formData);
    dispatch({ type: EDIT_KEG, payload: response.data });
    history.push('/kegs');
};

export const deleteKeg = (id) => {
    return async (dispatch) => {
        api.delete(`/kegs/${id}`);
        dispatch({ type: DELETE_KEG, payload: id})
        history.push('/kegs');
    }
}

export const createBeer = (formData) => { //include getState to have the user's id
    return async (dispatch) => {
        const response = await api.post(`/beers`,{...formData });
        dispatch({ type: CREATE_BEER, payload: response.data });
        history.push('/');
    }
}