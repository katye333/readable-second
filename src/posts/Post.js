import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPostById, deletePost, votePost } from '../posts/PostActions';
import { formatDate } from '../utils/helpers';
import CommentList from '../comments/CommentList';

class Post extends Component {
    state = {
        showComments: false,
        commentContainerClass: 'hidden',
        commentButtonLabel: 'View Comments'
    };
    componentDidMount() {
        const postId = this.props.match.params.id;
        this.props.fetchPostById(postId);
    }

    handleExpand() {
        this.state.showComments === false
            ? this.setState({ showComments: true, commentButtonLabel: 'Hide Comments' })
            : this.setState({ showComments: false, commentButtonLabel: 'View Comments' })
    }
    handleDelete(post) {
        const { history } = this.props;
        this.props.deletePost(post.id);
        history.push('/posts');
    }
    handleVote = (e, post) => {
        e.preventDefault();
        this.props.votePost(post.id, e.currentTarget.id);
    }

    render() {
        const post = this.props.post;
        let commentContainer;

        if (this.state.showComments === true) {
        	commentContainer = <div>
				<hr />
				<CommentList history={this.props.history} postId={post.id} />
			</div>
        }
        else {
        	commentContainer = <div></div>
        }

        return (
            <div className="w3-container post_form_container">
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
										<Link
											to={'/posts/'+ post.id}
											style={{ textDecoration: 'none' }}>
											{post.title}
										</Link>
									</h1>
									<strong>Author: </strong>{post.author}
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
			</div>
        );
    }
}

// Add State to the props of the MainPage component
function mapStateToProps({ posts }) {
    return {
        post: posts.posts
    }
}

// Pass event handler from Action Creators
function mapDispatchToProps(dispatch) {
    return {
        fetchPostById: (data) => dispatch(fetchPostById(data)),
        deletePost: (data) => dispatch(deletePost(data)),
        votePost: (data) => dispatch(votePost(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);