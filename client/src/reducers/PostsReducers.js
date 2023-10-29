import {
    CREATE_POSTS, DELETE_POSTS,
    GET_POSTS,
    GET_DETAIL_POSTS,
    GET_USERS_POSTS,
    UPDATE_POSTS, SEARCH_POSTS
} from "../actions/PostsActions";

const initialState = {
    getPostsResult: false,
    getPostsLoading: false,
    getPostsError: false,

    getDetailPostsResult: false,
    getDetailPostsLoading: false,
    getDetailPostsError: false,

    createPostsResult: false,
    createPostsLoading: false,
    createPostsError: false,

    getUsersPostsResult: false,
    getUsersPostsLoading: false,
    getUsersPostsError: false,

    updatePostsResult: false,
    updatePostsLoading: false,
    updatePostsError: false,

    deletePostsResult: false,
    deletePostsLoading: false,
    deletePostsError: false,

    searchPostsResult: false,
    searchPostsLoading: false,
    searchPostsError: false,
}
const PostsReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                getPostsResult: action.payload.data,
                getPostsLoading: action.payload.loading,
                getPostsError: action.payload.errorMessage
            }
        case GET_DETAIL_POSTS:
            return {
                ...state,
                getDetailPostsResult: action.payload.data,
                getDetailPostsLoading: action.payload.loading,
                getDetailPostsError: action.payload.errorMessage
            }
        case CREATE_POSTS:
            return {
                ...state,
                createPostsResult: action.payload.data,
                createPostsLoading: action.payload.loading,
                createPostsError: action.payload.errorMessage
            }
            case GET_USERS_POSTS:
            return {
                ...state,
                getUsersPostsResult: action.payload.data,
                getUsersPostsLoading: action.payload.loading,
                getUsersPostsError: action.payload.errorMessage
            }
            case UPDATE_POSTS:
            return {
                ...state,
                updatePostsResult: action.payload.data,
                updatePostsLoading: action.payload.loading,
                updatePostsError: action.payload.errorMessage
            }
            case DELETE_POSTS:
            return {
                ...state,
                deletePostsResult: action.payload.data,
                deletePostsLoading: action.payload.loading,
                deletePostsError: action.payload.errorMessage
            }
            case SEARCH_POSTS:
            return {
                ...state,
                searchPostsResult: action.payload.data,
                searchPostsLoading: action.payload.loading,
                searchPostsError: action.payload.errorMessage
            }
        default:
            return state
    }
}
export default PostsReducers