import { combineReducers } from 'redux';
import {
	CATEGORY_REQUEST,
	CATEGORY_RECEIVE,
	POST_REQUEST,
	POST_RECEIVE,
	POST_BY_CATEGORY,
	POST_BY_ID,
	POST_ADD,
	POST_EDIT,
	POST_DELETE,
	COMMENT_FETCH
} from '../actions';

/* Reducers */
// Retrieve/Update categories section of main object
function categories(state = {categoryIsFetching: false, categories: []}, action) {
    switch (action.type) {
        case CATEGORY_REQUEST:
            return Object.assign({}, state, {
				categoryIsFetching: true,
				categories: []
            })

        case CATEGORY_RECEIVE:
        	return Object.assign({}, state, {
        		categoryIsFetching: false,
        		categories: action.categories
        	})

        default:
            return state;
    }
}

function posts(state = {postIsFetching: false, posts: []}, action) {
    switch (action.type) {
        case POST_REQUEST:
            return Object.assign({}, state, {
				postIsFetching: true,
				posts: []
            })

        case POST_RECEIVE:
        	return Object.assign({}, state, {
        		postIsFetching: false,
        		posts: action.posts
        	})

        case POST_BY_ID:
        	return Object.assign({}, state, {
        		postIsFetching: false,
        		posts: action.post
        	})
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