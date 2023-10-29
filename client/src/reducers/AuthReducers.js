import {DETAILS_USERS, LOGIN_USERS, REGISTER_USERS, UPDATE_USERS} from "../actions/AuthAction";

const initialState = {
    registerUsersResult: false,
    registerUsersLoading: false,
    registerUsersError: false,

    loginUsersResult: false,
    loginUsersLoading: false,
    loginUsersError: false,

    updateUsersResult: false,
    updateUsersLoading: false,
    updateUsersError: false,

    detailsUsersResult: false,
    detailsUsersLoading: false,
    detailsUsersError: false,
}
const AuthReducers = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USERS:
            return {
                ...state,
                registerUsersResult: action.payload.data,
                registerUsersLoading: action.payload.loading,
                registerUsersError: action.payload.errorMessage
            }
        case LOGIN_USERS:
            return {
                ...state,
                loginUsersResult: action.payload.data,
                loginUsersLoading: action.payload.loading,
                loginUsersError: action.payload.errorMessage
            }
        case UPDATE_USERS:
            return {
                ...state,
                updateUsersResult: action.payload.data,
                updateUsersLoading: action.payload.loading,
                updateUsersError: action.payload.errorMessage
            }
            case DETAILS_USERS:
            return {
                ...state,
                detailsUsersResult: action.payload.data,
                detailsUsersLoading: action.payload.loading,
                detailsUsersError: action.payload.errorMessage
            }
        default:
            return state
    }
}
export default AuthReducers