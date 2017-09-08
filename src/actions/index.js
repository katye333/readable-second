// Constants for type property
import { CategoryAPI, PostAPI, CommentAPI } from '../utils/api';
export const CATEGORY_REQUEST = 'CATEGORY_REQUEST';
export const CATEGORY_RECEIVE = 'CATEGORY_RECEIVE';
export const POST_REQUEST = 'POST_REQUEST';
export const POST_RECEIVE = 'POST_RECEIVE';
export const POST_BY_ID = 'POST_BY_ID';
export const POST_ADD = 'POST_ADD';
export const POST_EDIT = 'POST_EDIT';
export const POST_DELETE = 'POST_DELETE';
export const COMMENT_FETCH = 'COMMENT_FETCH';
export const COMMENT_ADD = 'COMMENT_ADD';
export const COMMENT_EDIT = 'COMMENT_EDIT';
export const COMMENT_DELETE = 'COMMENT_DELETE';


/* ----------------------------------------- */
/* ************ ACTION CREATORS ************ */
/* ----------------------------------------- */
const url = 'http://localhost:5001';

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

// Headers for Ajax request
const headers = {
    'Accept': 'application/json',
    'Authorization': token
};

// Category Actions Creators
function requestCategories(categories) {
    return {
        type: CATEGORY_REQUEST,
        categories
    };
}

function receiveCategories(categories) {
	return {
		type: CATEGORY_RECEIVE,
		categories
	}
}

// Category Action Creator with a Thunk
export function getCategoriesAll(categories) {
  	return dispatch => {
    	dispatch(requestCategories(categories))

    	return fetch(`${url}/categories`, { method: 'GET', headers })
    		.then(response => response.json())
    		.then(json => dispatch(receiveCategories(json.categories)))
  	}
}

// Post Actions
function requestPosts(posts) {
	return {
		type: POST_REQUEST,
		posts
	};
}

function receivePosts(posts) {
	return {
		type: POST_RECEIVE,
		posts
	};
}

function receivePostById(post) {
	return {
		type: POST_BY_ID,
		post
	}
}

export function getPostsAll(posts) {
  	return dispatch => {
  		dispatch(requestPosts(posts))

    	return fetch(`${url}/posts`, { method: 'GET', headers })
    		.then(response => response.json())
    		.then(json => dispatch(receivePosts(json)))
  	}
}

export function getsPostsByCategory(category) {
  	return dispatch => {
  		dispatch(requestPosts(category))

    	return fetch(`${url}/${category}/posts`, { method: 'GET', headers })
    		.then(response => response.json())
    		.then(json => dispatch(receivePosts(json)))
  	}
}

// Category Action Creator with a Thunk
export function getPostById(post) {
	return dispatch => {
	    return fetch(`${url}/posts/${post}`, { method: 'GET', headers })
	    	.then(response => response.json())
	    	.then(json => dispatch(receivePostById(json)))
	}
}

export function addPost(post) {
	return {
		type: POST_RECEIVE,
		post
	};
}

export function editPost(post) {
	return {
		type: POST_EDIT,
		post
	};
}

export function deletePost(postId) {
	return {
		type: POST_DELETE,
		postId
	};
}

// Comment Actions
export function getComments(comments) {
	return {
		type: COMMENT_FETCH,
		comments
	};
}

export function addComment(comment) {
	return {
		type: COMMENT_ADD,
		comment
	};
}

export function editComment(comment) {
	return {
		type: COMMENT_EDIT,
		comment
	};
}

export function deleteComment(comment) {
	return {
		type: COMMENT_DELETE,
		comment
	};
}