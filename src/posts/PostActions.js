import axios from 'axios';
import {
    POST_REQUEST,
    POST_RECEIVE,
    POST_BY_ID_REQUEST,
    POST_BY_ID_RECEIVE,
    POST_BY_CATEGORY_REQUEST,
    POST_BY_CATEGORY_RECEIVE,
    POST_ADD_REQUEST,
    POST_ADD_RECEIVE,
    POST_VOTE_REQUEST,
    POST_VOTE_RECEIVE,
    POST_EDIT_REQUEST,
    POST_EDIT_RECEIVE,
    POST_DELETE_REQUEST,
    POST_DELETE_RECEIVE,
    POST_SORT_VOTE,
    POST_SORT_TIME
} from '../app/types';

const url = 'https://readable-backend.appspot.com';

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

// Headers for GET Ajax request
const getHeaders = {
	headers: {
		'Accept': 'application/json',
    	'Authorization': token
	}
}

// Headers for POST/PUT/DELETE Ajax request
const postHeaders = {
	headers: {
		'Accept': 'application/json',
        'Authorization': token,
        'Content-Type': 'application/json'
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

        return axios.get(`${url}/posts`, getHeaders)
                .then(response => dispatch(receivePosts(response.data)))
                .then(json => dispatch(sortByVotePosts(json.posts)))
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

        return axios.get(`${url}/${category}/posts`, getHeaders)
            .then(response => dispatch(receivePostsByCategory(response.data)))
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
        return axios.get(`${url}/posts/${postId}`, getHeaders)
            .then(response => dispatch(receivePostsById(response.data)))
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

        return axios.post(`${url}/posts`, JSON.stringify(post), postHeaders)
            .then(response => dispatch(receiveAddPost(response.data)))
    }
}

function requestVotePost(postId, option) {
    return {
        type: POST_VOTE_REQUEST,
        postId: postId,
        option: option,
        posts: []
    };
}

function receiveVotePost(postId, option, json) {
    return {
        type: POST_VOTE_RECEIVE,
        postId: postId,
        option: option,
        posts: json
    }
}

export function votePost(postId, option) {
    return dispatch => {
        dispatch(requestVotePost(postId, option))

        return axios.post(`${url}/posts/${postId}`, { option }, postHeaders)
           	.then(response => dispatch(receiveVotePost(postId, option, response.data)))
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

        return axios.put(`${url}/posts/${post.id}`, JSON.stringify(post), postHeaders)
           	.then(response => dispatch(receiveEditPost(response.data)))
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

        return axios.delete(`${url}/posts/${postId}`, postHeaders)
           	.then(response => dispatch(receiveDeletePost(response.data)))
    }
}

export function sortByVotePosts(posts) {
    return {
        type: POST_SORT_VOTE,
        posts: posts
    }
}

export function sortByTimePosts(posts) {
    return {
        type: POST_SORT_TIME,
        posts: posts
    }
}