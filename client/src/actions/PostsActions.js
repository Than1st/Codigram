import axios from "axios";

export const GET_POSTS = "GET_POSTS"
export const GET_DETAIL_POSTS = "GET_DETAIL_POSTS"
export const CREATE_POSTS = "CREATE_POSTS"
export const GET_USERS_POSTS = "GET_USERS_POSTS"
export const UPDATE_POSTS = "UPDATE_POSTS"
export const DELETE_POSTS = "DELETE_POSTS"
export const SEARCH_POSTS = "SEARCH_POSTS"
export const GetPosts = () => {
    return async (dispatch) => {
        dispatch({
            type: GET_POSTS,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "GET",
            url: "http://localhost:3000/posts",
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: GET_POSTS,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: GET_POSTS,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const GetDetailPosts = (params) => {
    return async (dispatch) => {
        dispatch({
            type: GET_DETAIL_POSTS,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "GET",
            url: "http://localhost:3000/posts/"+params,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: GET_DETAIL_POSTS,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: GET_DETAIL_POSTS,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const CreatePosts = (data, token) => {
    return async (dispatch) => {
        dispatch({
            type: CREATE_POSTS,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "POST",
            url: "http://localhost:3000/posts",
            headers:{authorization: token},
            data: data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: CREATE_POSTS,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: CREATE_POSTS,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.message
                }
            })
        })
    }
}
export const GetUserPosts = (params, data) => {
    return async (dispatch) => {
        dispatch({
            type: GET_USERS_POSTS,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "POST",
            url: "http://localhost:3000/posts/users/"+params,
            data: data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: GET_USERS_POSTS,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: GET_USERS_POSTS,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const UpdatePosts = (data, params, token) => {
    return async (dispatch) => {
        dispatch({
            type: UPDATE_POSTS,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "PUT",
            url: "http://localhost:3000/posts/"+params,
            headers: {authorization: token},
            data: data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: UPDATE_POSTS,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: UPDATE_POSTS,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const DeletePosts = (params, token, image) => {
    return async (dispatch) => {
        dispatch({
            type: DELETE_POSTS,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "DELETE",
            url: "http://localhost:3000/posts/"+params,
            headers:{authorization: token},
            data: {
              oldImage: image
            },
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: DELETE_POSTS,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: DELETE_POSTS,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const SearchPostsAction = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SEARCH_POSTS,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "POST",
            url: "http://localhost:3000/posts/search",
            data: data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: SEARCH_POSTS,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: SEARCH_POSTS,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
