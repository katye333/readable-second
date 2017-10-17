import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../posts/PostActions';
import { fetchPostById, deletePost, votePost, sortByTimePosts, sortByVotePosts } from '../posts/PostActions';
import { formatDate } from '../utils/helpers';
import { fetchComments } from '../comments/CommentActions';
import CommentList from '../comments/CommentList';
import _ from 'lodash';
import ErrorPage from './ErrorPage';

class Post extends Component {
    state = {
        showComments: false,
        commentContainerClass: 'hidden',
        commentButtonLabel: 'View Comments',
        hasError: false
    };

    componentDidMount() {
        const postId = this.props.match.params.id;
        this.props.fetchPostById(postId)
        	.catch((e) => {
        		this.setState({ hasError: true })
        	})
        	.then((result) => this.props.fetchComments(postId))
        	.then((posts) => {
        		Object.keys(this.props.posts.posts).length === 0 && this.props.posts.posts.constructor === Object
        			? this.setState({ hasError: true })
        			: this.setState({ hasError: false })
        	})
    }
    handleExpand() {
        this.state.showComments === false
            ? this.setState({ showComments: true, commentButtonLabel: 'Hide Comments' })
            : this.setState({ showComments: false, commentButtonLabel: 'View Comments' })
    }
    handleDelete(post) {
        const history = this.props.history;
        this.props.deletePost(post.id)
        	.then(history.go('/categories/' + post.category + '/' + post.id))
    }
    handleVote = (e, post) => {
        e.preventDefault();
        const history = this.props.history;

        this.props.votePost(post.id, e.currentTarget.id)
        	.then(history.go('/categories/' + post.category + '/' + post.id))
    }
    commentCount(comments, postId) {
    	for (let comment in comments) {
    		if (postId === comment) {
    			return comments[comment]
    		}
    		else
    			return 0
    	}
    }
    render() {
        const post = this.props.posts.posts;
        let comments = _.countBy(this.props.comments, 'parentId')
        let commentContainer;

        if (this.state.showComments === true) {
        	commentContainer = <div>
				<hr />
				<CommentList history={this.props.history} post={post} />
			</div>
        }
        else {
        	commentContainer = <div></div>
        }

        return (
            <div className="w3-container post_form_container" style={{ marginLeft: '245px' }}>
            	{this.state.hasError === true
            		? 	<ErrorPage />
            		: 	(
            				<div key={post.id} className="w3-card-4">
								<div className="w3-container w3-blue w3-padding-large">
									<div className="flex_row">
										<div
											className="flex_column"
											style={{
												justifyContent: 'center',
												marginRight: '20px'
											}}>
											<button type="button" id="upVote" className="w3-button w3-circle" onClick={(e) => this.handleVote(e, post)}>
												<span
													className="fa fa-angle-up"
													style={{
														color: '#1fc51f',
														fontSize: '36px'
													}}>
												</span>
											</button>
											<span style={{ fontSize: '18px', marginLeft: '20px' }}>{post.voteScore}</span>
											<button type="button" id="downVote" className="w3-button w3-circle" onClick={(e) => this.handleVote(e, post)}>
												<span
													className="fa fa-angle-down"
													style={{
														color: 'red',
														fontSize: '36px'
													}}>
												</span>
											</button>
										</div>
										<div style={{ paddingBottom: '10px' }} className="flex_column">
											<div style={{ flexDirection: 'row' }}>
												<h1>
													{post.title}
												</h1>
												<strong>Author: </strong>{post.author}
												<h6>Comments:&nbsp;
													{
														Object.keys(comments).length === 0
															? 0
															: this.commentCount(comments, post.id)
													}
												</h6>
											</div>
										</div>
									</div>
								</div>
								<div className="w3-container w3-padding-large">
									<p>{post.body}</p>
									<div><strong>Posted At: </strong>{formatDate(post.timestamp)}</div>
									<div><strong>Category: </strong>{post.category}</div>

									{commentContainer}
								</div>

								<div className="w3-container w3-blue" style={{ padding: '10px' }}>
									<div className="w3-bar w3-padding-larger">
										<button type="button" className="w3-button" onClick={this.handleExpand.bind(this)}>{this.state.commentButtonLabel}</button>
										<div className="w3-right">
											<Link
												to={'/edit/'+ post.id}
												className="w3-button"
												style={{ textDecoration: 'none' }}>
												Edit Post
											</Link>
											<button type="button" className="w3-button" onClick={() => this.handleDelete(post)}>Delete Post</button>
										</div>
									</div>
								</div>
							</div>
						)
            	}

			</div>
        );
    }
}

// Add State to the props of the MainPage component
function mapStateToProps({ posts, comments }) {
    return {
        posts: posts,
        comments: comments.comments
    }
}

export default connect(mapStateToProps, { fetchPostById, deletePost, votePost, sortByTimePosts, sortByVotePosts, fetchComments })(Post);