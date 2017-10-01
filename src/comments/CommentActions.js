import axios from 'axios';
import {
    COMMENT_REQUEST,
    COMMENT_RECEIVE,
    COMMENT_BY_ID_REQUEST,
    COMMENT_BY_ID_RECEIVE,
    COMMENT_ADD_REQUEST,
    COMMENT_ADD_RECEIVE,
    COMMENT_VOTE_REQUEST,
    COMMENT_VOTE_RECEIVE,
    COMMENT_EDIT_REQUEST,
    COMMENT_EDIT_RECEIVE,
    COMMENT_DELETE_REQUEST,
    COMMENT_DELETE_RECEIVE,
    COMMENT_SORT_VOTE,
    COMMENT_SORT_TIME
} from '../app/types';

const url = 'http://localhost:5001';

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

function requestComments() {
    return {
        type: COMMENT_REQUEST,
        comments: []
    }
}

function receiveComments(json) {
    return {
        type: COMMENT_RECEIVE,
        comments: json
    };
}

export function fetchComments(postId) {
    return dispatch => {
        dispatch(requestComments())

        return axios.get(`${url}/posts/${postId}/comments`, getHeaders)
                .then(response => dispatch(receiveComments(response.data)))
                .then(json => dispatch(sortByVoteComments(json.posts)))
    }
}

function requestAddComment() {
    return {
        type: COMMENT_ADD_REQUEST,
        comments: []
    };
}

function receiveAddComment(comment) {
    return {
        type: COMMENT_ADD_RECEIVE,
        comments: comment
    }
}

export function addComment(comment) {
    return dispatch => {
        dispatch(requestAddComment())

        return axios.post(`${url}/comments`, JSON.stringify(comment), postHeaders)
            .then(response => dispatch(receiveAddComment(response.data)))
    }
}


function requestCommentById() {
    return {
        type: COMMENT_BY_ID_REQUEST,
        comments: []
    };
}

function receiveCommentById(json) {
    return {
        type: COMMENT_BY_ID_RECEIVE,
        comments: json
    }
}

// Category Action Creator with a Thunk
export function fetchCommentById(commentId) {
    return dispatch => {
        dispatch(requestCommentById())

        return axios.get(`${url}/comments/${commentId}`, getHeaders)
            .then(response => dispatch(receiveCommentById(response.data)))
    }
}

function requestEditComment() {
    return {
        type: COMMENT_EDIT_REQUEST,
        comments: []
    }
}

function receiveEditComment(json) {
    return {
        type: COMMENT_EDIT_RECEIVE,
        comments: json
    }
}

export function editComment(comment) {
    return dispatch => {
        dispatch(requestEditComment());

        return axios.put(`${url}/comments/${comment.id}`, JSON.stringify(comment), postHeaders)
           	.then(response => dispatch(receiveEditComment(response.data)))
    }
}

function requestDeleteComment() {
    return {
        type: COMMENT_DELETE_REQUEST,
        comments: []
    }
}

function receiveDeleteComment(json) {
    return {
        type: COMMENT_DELETE_RECEIVE,
        comments: json
    }
}

export function deleteComment(commentId) {
    return dispatch => {
        dispatch(requestDeleteComment())

        return axios.delete(`${url}/comments/${commentId}`, postHeaders)
           	.then(response => dispatch(receiveDeleteComment(response.data)))
    }
}

export function sortByVoteComments(comments) {
    return {
        type: COMMENT_SORT_VOTE,
        comments: comments
    }
}

export function sortByTimeComments(comments) {
    return {
        type: COMMENT_SORT_TIME,
        comments: comments
    }
}