import {combineReducers} from 'redux'
import AuthReducers from "./AuthReducers";
import PostsReducers from "./PostsReducers";

export default combineReducers({
    AuthReducers,
    PostsReducers
})