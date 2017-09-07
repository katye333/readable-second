// Constants for type property
import { CategoryAPI } from '../utils/api';
export const CATEGORY_FETCH = 'CATEGORY_FETCH';
export const CATEGORY_RECEIVE = 'CATEGORY_RECEIVE';
export const POST_FETCH = 'POST_FETCH';
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
// Category Actions
export function requestCategories(categories) {
    return {
        type: CATEGORY_FETCH,
        categories
    };
}

export function receiveCategories(categories) {
	return {
		type: CATEGORY_RECEIVE,
		categories
	}
}

export function getCategoriesAll(categories) {
  return dispatch => {
    dispatch(requestCategories(categories))

    return fetch(`${url}/categories`, { method: 'GET', headers })
    	.then(response => response.json())
    	.then(json => dispatch(receiveCategories(json.categories)))
  }
}

// Post Actions
export function getPosts(posts) {
	return {
		type: POST_FETCH,
		posts
	};
}

export function addPost(post) {
	return {
		type: POST_ADD,
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