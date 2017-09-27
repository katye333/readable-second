import {
	CATEGORY_REQUEST,
    CATEGORY_RECEIVE,
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