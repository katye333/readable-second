import _ from 'lodash';
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
                comments: _.filter(action.comments, ['deleted', false])
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

        case COMMENT_VOTE_REQUEST:
            return Object.assign({}, state, {
                fetchingComments: true,
                postId: action.postId,
                comments: action.comments
            });

        case COMMENT_VOTE_RECEIVE:
        	if (action.option === 'upVote') {
        		return Object.assign({}, state, {
        		    fetchingComments: false,
        		    comments: state.comments.filter(comment => {
        		        if (comment.id !== action.id) {
        		            return comment;
        		        }

        		       	let newVote = comment.voteScore += 1
        		        return Object.assign({}, comment, {
        		            voteScore: newVote
        		        })
        		    })
        		});
        	}
        	else if (action.option === 'downVote') {
        		return Object.assign({}, state, {
        		    fetchingComments: false,
        		    comments: state.comments.filter(comment => {
        		        if (comment.id !== action.id) {
        		            return comment;
        		        }

        		        let newVote = comment.voteScore -= 1
        		        return Object.assign({}, comment, {
        		            voteScore: newVote
        		        })
        		    })
        		});
        	}


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

                    let deleted = !comment.deleted
                    return Object.assign({}, comment, {
                        deleted: deleted
                    })
                })
            });

        case COMMENT_SORT_VOTE:
            let sortByVoteComments = _.sortBy(state.comments, 'voteScore').reverse()
            return Object.assign({}, state, {
                fetchingComments: false,
                sort: 'voteScore',
                comments: sortByVoteComments
            });

        case COMMENT_SORT_TIME:
        	let sortByTimeComments = _.sortBy(state.comments, 'timestamp').reverse()
            return Object.assign({}, state, {
                fetchingComments: false,
                sort: 'timestamp',
                comments: sortByTimeComments
            });

        default:
            return state;
    }
}

export default comments;