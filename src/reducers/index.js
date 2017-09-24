import { combineReducers } from 'redux';
import _ from 'lodash';
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
    POST_VOTE_REQUEST,
    POST_VOTE_RECEIVE,
    POST_EDIT_REQUEST,
    POST_EDIT_RECEIVE,
    POST_DELETE_REQUEST,
    POST_DELETE_RECEIVE,
    POST_SORT_VOTE,
    POST_SORT_TIME,
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
} from '../actions';

/* Reducers */
// Retrieve/Update categories section of main object
function categories(state = { fetchingCategories: false, categories: [] }, action) {
    switch (action.type) {
        case CATEGORY_REQUEST:
            return Object.assign({}, state, {
                fetchingCategories: true,
                categories: []
            });

        case CATEGORY_RECEIVE:
            return Object.assign({}, state, {
                fetchingCategories: false,
                categories: action.categories
            });

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
            });

        case POST_RECEIVE:
            return Object.assign({}, state, {
                fetchingPosts: false,
                posts: action.posts
            });

        case POST_BY_ID_REQUEST:
            return Object.assign({}, state, {
                fetchingPosts: true,
                posts: []
            });

        case POST_BY_ID_RECEIVE:
            return Object.assign({}, state, {
                fetchingPosts: false,
                posts: action.posts
            });

        case POST_BY_CATEGORY_REQUEST:
            return Object.assign({}, state, {
                fetchingPosts: true,
                posts: []
            });

        case POST_BY_CATEGORY_RECEIVE:
            return Object.assign({}, state, {
                fetchingPosts: false,
                posts: action.posts
            });

        case POST_ADD_REQUEST:
            return Object.assign({}, state, {
                fetchingPosts: true,
                posts: []
            });

        case POST_ADD_RECEIVE:
            return Object.assign({}, state, {
                fetchingPosts: false,
                posts: action.posts
            });

        case POST_VOTE_REQUEST:
            return Object.assign({}, state, {
                fetchingPosts: true,
                option: '',
                posts: []
            });

        case POST_VOTE_RECEIVE:
            return Object.assign({}, state, {
                fetchingPosts: false,
                option: action.option,
                posts: action.posts
            });

        case POST_EDIT_REQUEST:
            return Object.assign({}, state, {
                fetchingPosts: true,
                posts: []
            });

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
            });

        case POST_DELETE_REQUEST:
            return Object.assign({}, state, {
                fetchingPosts: true,
                posts: []
            });

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
            });

        case POST_SORT_VOTE:
            return Object.assign({}, state, {
                fetchingPosts: false,
                sort: 'voteScore',
                posts: _.sortBy(state.posts, 'voteScore').reverse()
            });

        case POST_SORT_TIME:
            return Object.assign({}, state, {
                fetchingPosts: false,
                sort: 'timestamp',
                posts: _.sortBy(state.posts, 'timestamp').reverse()
            });

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
            });

        case COMMENT_RECEIVE:
            return Object.assign({}, state, {
                fetchingComments: false,
                postId: action.postId,
                comments: action.comments
            });

        case COMMENT_BY_ID_REQUEST:
            return Object.assign({}, state, {
                fetchingComments: true,
                postId: action.postId,
                comments: []
            });

        case COMMENT_BY_ID_RECEIVE:
            return Object.assign({}, state, {
                fetchingComments: false,
                postId: action.postId,
                comments: action.comments
            });

        case COMMENT_ADD_REQUEST:
            return Object.assign({}, state, {
                fetchingComments: true,
                postId: action.postId,
                comments: []
            });

        case COMMENT_ADD_RECEIVE:
            return Object.assign({}, state, {
                fetchingComments: false,
                postId: action.postId,
                comments: action.comments
            });

        case COMMENT_EDIT_REQUEST:
            return Object.assign({}, state, {
                fetchingComments: true,
                postId: action.postId,
                comments: []
            });

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
            });

        case COMMENT_DELETE_REQUEST:
            return Object.assign({}, state, {
                fetchingComments: true,
                postId: action.postId,
                comments: []
            });

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
            });

        case COMMENT_SORT_VOTE:
            return Object.assign({}, state, {
                fetchingComments: false,
                sort: 'voteScore',
                comments: _.sortBy(state.comments, 'voteScore').reverse()
            });

        case COMMENT_SORT_TIME:
            return Object.assign({}, state, {
                fetchingComments: false,
                sort: 'timestamp',
                comments: _.sortBy(state.comments, 'timestamp').reverse()
            });

        default:
            return state;
    }
}

export default combineReducers({
    categories,
    posts,
    comments
});