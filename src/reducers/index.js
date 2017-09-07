import { combineReducers } from 'redux';
import {
	CATEGORY_FETCH,
	POST_FETCH,
	COMMENT_FETCH,
	POST_ADD,
	POST_EDIT,
	POST_DELETE
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
                posts: posts.filter(post => !post.deleted)
            }
        case POST_ADD:
        	return Object.assign({}, state, {
        		posts: state.posts.concat({
        			id: action.id,
        			timestamp: action.timestamp,
        			title: action.title,
        			body: action.body,
        			author: action.author,
        			category: action.category,
        			voteScore: action.voteScore,
        			deleted: action.deleted
        		})
        	})
        case POST_EDIT:
        	return Object.assign({}, state, {
        		posts: state.posts.map(post => {
        			if (post.id !== action.id)
        				return post

        			return Object.assign({}, post, {
        				posts: post
        			})
        		})
        	})
        case POST_DELETE:
        	return Object.assign({}, state, {
        		posts: state.posts.filter(post => post.id !== action.postId)
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