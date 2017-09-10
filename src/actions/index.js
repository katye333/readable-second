// Constants for type property
import { CategoryAPI, PostAPI, CommentAPI } from '../utils/api';
export const CATEGORY_REQUEST = 'CATEGORY_REQUEST';
export const CATEGORY_RECEIVE = 'CATEGORY_RECEIVE';
export const POST_REQUEST = 'POST_REQUEST';
export const POST_RECEIVE = 'POST_RECEIVE';

export const POST_BY_ID_REQUEST = 'POST_BY_ID_REQUEST';
export const POST_BY_ID_RECEIVE = 'POST_BY_ID_RECEIVE';
export const POST_BY_CATEGORY_REQUEST = 'POST_BY_CATEGORY_REQUEST';
export const POST_BY_CATEGORY_RECEIVE = 'POST_BY_CATEGORY_RECEIVE';

export const POST_ADD_REQUEST = 'POST_ADD_REQUEST';
export const POST_ADD_RECEIVE = 'POST_ADD_RECEIVE';
export const POST_EDIT_REQUEST = 'POST_EDIT_REQUEST';
export const POST_EDIT_RECEIVE = 'POST_EDIT_RECEIVE';

export const POST_DELETE = 'POST_DELETE';
export const POST_DELETE_REQUEST = 'POST_DELETE_REQUEST';
export const POST_DELETE_RECEIVE = 'POST_DELETE_RECEIVE';

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
function requestCategories() {
    return {
        type: CATEGORY_REQUEST,
        categories: []
    };
}

function receiveCategories(json) {
    return {
        type: CATEGORY_RECEIVE,
        categories: json.categories
    }
}

// Category Action Creator with a Thunk
export function fetchCategories() {
    return dispatch => {
        dispatch(requestCategories())

        return fetch(`${url}/categories`, { method: 'GET', headers })
            .then(response => response.json())
            .then(json => dispatch(receiveCategories(json)))
    }
}

// Post Actions
function requestPosts() {
    return {
        type: POST_REQUEST,
        posts: []
    }
}

function receivePosts(posts) {
    return {
        type: POST_RECEIVE,
        posts: posts
    };
}

export function fetchPosts() {
    return dispatch => {
        dispatch(requestPosts())

        return fetch(`${url}/posts`, { method: 'GET', headers })
            .then(response => response.json())
            .then(json => dispatch(receivePosts(json)))
    }
}

function requestPostsByCategory() {
    return {
        type: POST_BY_CATEGORY_REQUEST,
        posts: []
    };
}

function receivePostsByCategory(posts) {
    return {
        type: POST_BY_CATEGORY_RECEIVE,
        posts: posts
    }
}

export function fetchPostsByCategory(category) {
    return dispatch => {
        dispatch(requestPostsByCategory())

        return fetch(`${url}/${category}/posts`, { method: 'GET', headers })
            .then(response => response.json())
            .then(json => dispatch(receivePostsByCategory(json)))
    }
}

function requestPostsById() {
    return {
        type: POST_BY_ID_REQUEST,
        posts: []
    };
}

function receivePostsById(json) {
    return {
        type: POST_BY_ID_RECEIVE,
        posts: json
    }
}

// Category Action Creator with a Thunk
export function fetchPostById(postId) {
    return dispatch => {
        dispatch(requestPostsById())
        return fetch(`${url}/posts/${postId}`, { method: 'GET', headers })
            .then(response => response.json())
            .then(json => dispatch(receivePostsById(json)))
    }
}

function requestAddPost() {
    return {
        type: POST_ADD_REQUEST,
        posts: []
    };
}

function receiveAddPost(post) {
    return {
        type: POST_ADD_RECEIVE,
        posts: post
    }
}

export function addPost(post) {
    return dispatch => {
        dispatch(requestAddPost())

        return fetch(`${url}/posts`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            })
            .then(response => response.json())
            .then(json => dispatch(receiveAddPost(json)))
    }
}

function requestEditPost() {
    return {
        type: POST_EDIT_REQUEST,
        posts: []
    }
}

function receiveEditPost(post) {
    return {
        type: POST_EDIT_RECEIVE,
        posts: post
    }
}

export function editPost(post) {
    return dispatch => {
        dispatch(requestEditPost())

        return fetch(`${url}/posts/${post.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            })
            .then(response => response.json())
            .then(json => dispatch(receiveEditPost(json)))
    }
}

function requestDeletePost() {
    return {
        type: POST_DELETE_REQUEST,
        posts: []
    }
}

function receiveDeletePost(post) {
    return {
        type: POST_DELETE_RECEIVE,
        posts: post
    }
}

export function deletePost(postId) {
    return dispatch => {
        dispatch(requestDeletePost())
        return fetch(`${url}/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.text())
            .then(json => dispatch(receiveDeletePost(json)))
    }
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