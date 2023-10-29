import axios from "axios";

export const REGISTER_USERS = "REGISTER_USERS"
export const LOGIN_USERS = "LOGIN_USERS"
export const UPDATE_USERS = "UPDATE_USERS"
export const DETAILS_USERS = "DETAILS_USERS"

export const DetailsUsers = (id) => {
    return async (dispatch) => {
        dispatch({
            type: DETAILS_USERS,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        await axios({
            method: "GET",
            url: "http://localhost:3000/users/"+id,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: DETAILS_USERS,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: DETAILS_USERS,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const UpdateUsers = (data, id, token) => {
    return async (dispatch) => {
        dispatch({
            type: UPDATE_USERS,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        await axios({
            method: "PUT",
            url: "http://localhost:3000/users/"+id,
            headers: {authorization: token},
            data: data,
            timeout: 120000
        }).then((res) => {
            sessionStorage.setItem('userdata', JSON.stringify({data: res.data[0], token: token}))
            dispatch({
                type: UPDATE_USERS,
                payload: {
                    loading: false,
                    data: res.data[0],
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: UPDATE_USERS,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const RegisterUsers = (data) => {
    return async (dispatch) => {
        dispatch({
            type: REGISTER_USERS,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        await axios({
            method: "POST",
            url: "http://localhost:3000/users/",
            data: data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: REGISTER_USERS,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: REGISTER_USERS,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const LoginUsers = (data) => {
    return async (dispatch) => {
        dispatch({
            type: LOGIN_USERS,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        await axios({
            method: "POST",
            url: "http://localhost:3000/users/login",
            data: data,
            timeout: 120000
        }).then((res) => {
            sessionStorage.setItem('userdata', JSON.stringify(res.data))
            dispatch({
                type: LOGIN_USERS,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: LOGIN_USERS,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
