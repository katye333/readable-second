import { combineReducers } from 'redux';
import {
	CATEGORY_FETCH,
	POST_FETCH,
	COMMENT_FETCH
} from '../actions';

/* Reducers */
// Retrieve/Update categories section of main object
function categories(state = {categories: []}, action) {
    switch (action.type) {
        case CATEGORY_FETCH:
            const { categories } = action;
            return {
                ...state,
                categories
            };

        default:
            return state;
    }
}

function posts(state = {posts: []}, action) {
    switch (action.type) {
        case POST_FETCH:
            const { posts } = action;
            return {
                ...state,
                posts
            };

        default:
            return state;
    }
}

function comments(state = {comments: []}, action) {
    switch (action.type) {
        case COMMENT_FETCH:
            const { comments } = action;
            return {
                ...state,
                comments
            };

        default:
            return state;
    }
}

export default combineReducers({
    categories,
    posts,
    comments
});