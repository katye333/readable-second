// import axios from 'axios';
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

// Headers for Ajax request
const headers = {
    'Accept': 'application/json',
    'Authorization': token
};

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

        return setTimeout(function() {
            fetch(`${url}/posts/${postId}/comments`, { method: 'GET', headers })
                .then(response => response.json())
                .then(json => dispatch(receiveComments(json)))
                .then(data => dispatch(sortByVoteComments(data.posts)))
        }, 1000)
    }
}

function requestAddComment() {
    return {
        type: COMMENT_ADD_REQUEST,
        comments: []
    };
}

function receiveAddComment(post) {
    return {
        type: COMMENT_ADD_RECEIVE,
        comments: post
    }
}

export function addComment(post) {
    return dispatch => {
        dispatch(requestAddComment())

        return fetch(`${url}/comments`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            })
            .then(response => response.json())
            .then(json => dispatch(receiveAddComment(json)))
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
        return fetch(`${url}/comments/${commentId}`, { method: 'GET', headers })
            .then(response => response.json())
            .then(json => dispatch(receiveCommentById(json)))
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
        dispatch(requestEditComment())

        return fetch(`${url}/comments/${comment.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(comment)
            })
            .then(response => response.json())
            .then(json => dispatch(receiveEditComment(json)))
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
        return fetch(`${url}/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.text())
            .then(json => dispatch(receiveDeleteComment(json)))
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