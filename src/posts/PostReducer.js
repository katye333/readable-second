import _ from 'lodash';
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
                posts: _.filter(action.posts, ['deleted', false])
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
        	return action.option === 'upVote'
        		? 	(
	        			Object.assign({}, state, {
		        		    fetchingPosts: false,
		        		    posts: state.posts.filter(post => {
		        		        if (post.id !== action.id) {
		        		            return post;
		        		        }

		        		        let newVote = post.voteScore += 1
		        		        return Object.assign({}, post, {
		        		            voteScore: newVote
		        		        })
		        		    })
		        		})
		        	)
        		: 	(
        				Object.assign({}, state, {
        				    fetchingPosts: false,
        				    posts: state.posts.filter(post => {
        				        if (post.id !== action.id) {
        				            return post;
        				        }

        				        let newVote = post.voteScore -= 1
        				        return Object.assign({}, post, {
        				            voteScore: newVote
        				        })
        				    })
        				})
        			)

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

export default posts;