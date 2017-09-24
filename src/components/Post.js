import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPostById, deletePost } from '../actions';
import { formatDate } from '../utils/helpers';
import CommentList from './CommentList';

class Post extends Component {
    state = {
        showComments: false,
        commentContainerClass: 'hidden',
        commentButtonLabel: 'View Comments'
    };
    componentDidMount() {
        const postId = this.props.match.params.id;
        this.props.fetchPostById(postId)
    }
    handleExpand() {
        this.state.showComments === false
            ? this.setState({ showComments: true, commentContainerClass: '', commentButtonLabel: 'Hide Comments' })
            : this.setState({ showComments: false, commentContainerClass: 'hidden', commentButtonLabel: 'View Comments' })
    }
    handleDelete(post) {
        const { history } = this.props;
        this.props.deletePost(post.id);
        history.push('/posts')
    }

    render() {
        const post = this.props.post;
        return (
            <div className="w3-container" style={{ marginLeft: '200px', marginTop: '20px', width: '50%' }}>
				<div key={post.id} className="w3-card-4">
					<div className="w3-container w3-blue w3-padding-large">
						<div style={{
								display: 'flex',
								flexDirection: 'row'
							}}>
							<div style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									marginRight: '20px'
								}}>
								<span
									className="fa fa-angle-up"
									style={{
										color: '#1fc51f',
										fontSize: '36px'
									}}>
								</span>
								<span style={{ fontSize: '18px', marginLeft: '5px' }}>{post.voteScore}</span>
								<span
									className="fa fa-angle-down"
									style={{
										color: 'red',
										fontSize: '36px'
									}}>
								</span>
							</div>
							<div style={{ paddingBottom: '10px', display: 'flex', flexDirection: 'column' }}>
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

						<div className={this.state.commentContainerClass}>
							<hr />
							<CommentList history={this.props.history} postId={post.id} />
						</div>
						<div><strong>Posted At: </strong>{formatDate(post.timestamp)}</div>
						<div><strong>Category: </strong>{post.category}</div>
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
        deletePost: (data) => dispatch(deletePost(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);