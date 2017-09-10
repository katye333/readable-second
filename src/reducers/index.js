import { combineReducers } from 'redux';
import {
    CATEGORY_REQUEST,
    CATEGORY_RECEIVE,
    POST_REQUEST,
    POST_RECEIVE,
    POST_BY_ID_REQUEST,
    POST_BY_ID_RECEIVE,
    POST_BY_CATEGORY_REQUEST,
    POST_BY_CATEGORY_RECEIVE,
    POST_ADD_REQUEST,
    POST_ADD_RECEIVE,
    POST_EDIT_REQUEST,
    POST_EDIT_RECEIVE,
    POST_DELETE_REQUEST,
    POST_DELETE_RECEIVE,
    COMMENT_FETCH
} from '../actions';

/* Reducers */
// Retrieve/Update categories section of main object
function categories(state = { categoryIsFetching: false, categories: [] }, action) {
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

function posts(state = { postIsFetching: false, posts: [] }, action) {
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

        case POST_BY_ID_REQUEST:
            return Object.assign({}, state, {
                fetchingPosts: true,
                posts: []
            })

        case POST_BY_ID_RECEIVE:
            return Object.assign({}, state, {
                fetchingPosts: false,
                posts: action.posts
            })

        case POST_BY_CATEGORY_REQUEST:
            return Object.assign({}, state, {
                fetchingPosts: true,
                posts: []
            })

        case POST_BY_CATEGORY_RECEIVE:
            return Object.assign({}, state, {
                fetchingPosts: false,
                posts: action.posts
            })

        case POST_ADD_REQUEST:
            return Object.assign({}, state, {
                fetchingPosts: true,
                posts: []
            })

        case POST_ADD_RECEIVE:
            return Object.assign({}, state, {
                fetchingPosts: false,
                posts: action.posts
            })

        case POST_EDIT_REQUEST:
            return Object.assign({}, state, {
                fetchingPosts: true,
                posts: []
            })

        case POST_EDIT_RECEIVE:
            return Object.assign({}, state, {
                fetchingPosts: false,
                posts: state.posts.map(post => {
                    if (post.id !== action.id) {
                        return post;
                    }

                    return Object.assign({}, post, {
                        title: action.title,
                        author: action.author,
                        category: action.category,
                        body: action.body
                    })
                })
            })

            return Object.assign({}, state, {
                fetchingPosts: false,
                posts: state.posts.map(post => {
                    if (post.id !== action.id) {
                        return post;
                    }

                    return Object.assign({}, post, {
                        title: action.title,
                        author: action.author,
                        body: action.body,
                        category: action.category
                    })
                })
            });

        case POST_DELETE_REQUEST:
            return Object.assign({}, state, {
                fetchingPosts: true,
                posts: []
            })

        case POST_DELETE_RECEIVE:
            return Object.assign({}, state, {
                fetchingPosts: false,
                posts: state.posts.filter(post => {
                    if (post.id !== action.id) {
                        return post;
                    }

                    return Object.assign({}, post, {
                        deleted: !post.deleted
                    })
                })
            })

        default:
            return state;
    }

    function comments(state = { comments: [] }, action) {
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
}
export default combineReducers({
    categories,
    posts
});