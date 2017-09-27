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

        return setTimeout(function() {
            fetch(`${url}/posts`, { method: 'GET', headers })
                .then(response => response.json())
                .then(json => dispatch(receivePosts(json)))
                .then(data => dispatch(sortByVotePosts(data.posts)))
        }, 1000)
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

        return fetch(`${url}/posts/${postId}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(option)
            })
            .then(response => response.json())
            .then(json => dispatch(receiveVotePost(postId, option, json)))
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