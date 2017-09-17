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
    COMMENT_DELETE_RECEIVE
} from '../actions';

/* Reducers */
// Retrieve/Update categories section of main object
function categories(state = { fetchingCategories: false, categories: [] }, action) {
    switch (action.type) {
        case CATEGORY_REQUEST:
            return Object.assign({}, state, {
                fetchingCategories: true,
                categories: []
            })

        case CATEGORY_RECEIVE:
            return Object.assign({}, state, {
                fetchingCategories: false,
                categories: action.categories
            })

        default:
            return state;
    }
}

function posts(state = { fetchingPosts: false, posts: [] }, action) {
    switch (action.type) {
        case POST_REQUEST:
            return Object.assign({}, state, {
                fetchingPosts: true,
                posts: []
            })

        case POST_RECEIVE:
            return Object.assign({}, state, {
                fetchingPosts: false,
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
}

function comments(state = { fetchingComments: false, comments: [] }, action) {
    switch (action.type) {
        case COMMENT_REQUEST:
            return Object.assign({}, state, {
                fetchingComments: true,
                postId: action.postId,
                comments: []
            })

        case COMMENT_RECEIVE:
            return Object.assign({}, state, {
                fetchingComments: false,
                postId: action.postId,
                comments: action.comments
            })

        case COMMENT_BY_ID_REQUEST:
            return Object.assign({}, state, {
                fetchingComments: true,
                postId: action.postId,
                comments: []
            })

        case COMMENT_BY_ID_RECEIVE:
            return Object.assign({}, state, {
                fetchingComments: false,
                postId: action.postId,
                comments: action.comments
            })

        case COMMENT_ADD_REQUEST:
            return Object.assign({}, state, {
                fetchingComments: true,
                postId: action.postId,
                comments: []
            })

        case COMMENT_ADD_RECEIVE:
            return Object.assign({}, state, {
                fetchingComments: false,
                postId: action.postId,
                comments: action.comments
            })

        case COMMENT_EDIT_REQUEST:
            return Object.assign({}, state, {
                fetchingComments: true,
                postId: action.postId,
                comments: []
            })

        case COMMENT_EDIT_RECEIVE:
            return Object.assign({}, state, {
                fetchingComments: false,
                postId: action.postId,
                comments: state.comments.map(comment => {
                    if (comment.id !== action.id) {
                        return comment;
                    }

                    return Object.assign({}, comment, {
                        title: action.title,
                        author: action.author,
                        category: action.category,
                        body: action.body
                    })
                })
            })

        case COMMENT_DELETE_REQUEST:
            return Object.assign({}, state, {
                fetchingComments: true,
                postId: action.postId,
                comments: []
            })

        case COMMENT_DELETE_RECEIVE:
            return Object.assign({}, state, {
                fetchingComments: false,
                postId: action.postId,
                comments: state.comments.filter(comment => {
                    if (comment.id !== action.id) {
                        return comment;
                    }

                    return Object.assign({}, comment, {
                        deleted: !comment.deleted
                    })
                })
            })

        default:
            return state;
    }
}

export default combineReducers({
    categories,
    posts,
    comments
});