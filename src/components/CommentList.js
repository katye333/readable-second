import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CommentAPI } from '../utils/api';
import _ from 'lodash';
import { getPosts, deletePost } from '../actions';
import { formatDate } from '../utils/helpers';
import AddPost from './AddPost';

class PostList extends Component {
	state = {
    	sortType: 'vote'
  	};
	componentDidMount() {
		if (this.props.match.params.path) {
			CommentAPI.fetchCommentsByPost(this.props.match.params.path)
				.then((posts) => {
			    	this.props.getPosts(posts);
				});
		}
		else {
			PostAPI.fetchPosts()
				.then((posts) => {
			    	this.props.getPosts(posts);
				});
		}
    }

  	handleSort(e) {
  		const newSort = e.target.id;

  		if (this.state.vote === newSort)
  			this.setState({ sort: newSort })
  	}

  	handleDelete = (post) => {
  		const { history } = this.props;
  		const id = post.id;
  		PostAPI.deletePost(post.id)
			.then((thisPost) => {
            	this.props.deletePost(id);
        	})
			.then(data => history.push('/posts'))
  	}
	render() {
		const posts = this.props.posts;

		let sortedPosts = (this.state.sort === 'vote'
    		? _.sortBy(posts, 'voteScore').reverse()
    		: _.sortBy(posts, 'timestamp').reverse())

		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-offset-3 col-sm-6">
						{_.isArray(this.props.posts) && sortedPosts.map((post) => {
							return (
								<div key={post.id} className="panel panel-default">
									<div className="panel-heading" key={post.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
										<div style={{ display: 'flex', flexDirection: 'row' }}>
											<span className="glyphicon glyphicon-user" style={{ padding: '10px', paddingTop: '20px' }}></span>
											<div style={{ padding: '10px', display: 'flex', flexDirection: 'column' }}>
												<div style={{ flexDirection: 'row' }}>
													<strong>Title</strong>: <Link to={'/posts/'+ post.id}>{post.title}</Link>
												</div>
												<div><strong>Author</strong>: {post.author}</div>
											</div>
										</div>
										<div>
											<div style={{ display: 'flex', flexDirection: 'row' }}>
												<span style={{ paddingTop: '20px', fontSize: '18px' }}>{post.voteScore}</span>
												<div style={{ display: 'flex', flexDirection: 'column', marginTop: '5px' }}>
													<span className="glyphicon glyphicon-arrow-up" style={{ padding: '5px', fontSize: '20px', color: '#1fc51f' }}></span>
													<span className="glyphicon glyphicon-arrow-down" style={{ padding: '5px', fontSize: '20px', color: 'red' }}></span>
												</div>
											</div>
										</div>
									</div>
									<div className="panel-body">
										<div><strong>Posted At: </strong>: {formatDate(post.timestamp)}</div>
										<div><strong>Category</strong>: {post.category}</div>
										<div>{post.body}</div>

										<div className="hidden" id="comment_container">
											<hr />

										</div>
									</div>
									<div className="panel-footer">
										<button type="button" className="btn btn-default" onClick={this.handleExpand}>View Comments</button>
										<div className="btn-group pull-right">
											<Link to={'/edit/'+ post.id} className="btn btn-default">Edit Post</Link>
											<button type="button" className="btn btn-default" onClick={() => this.handleDelete(post)}>Delete Post</button>
										</div>
									</div>
								</div>
							);
						})}

						<Link to="/newPost" className="btn btn-primary">Create New Post</Link>

						<ul className="list-group">
							<li id="time" className="list-group-item" onClick={this.handleSort}>Sort Posts by Timestamp</li>
							<li id="vote" className="list-group-item" onClick={this.handleSort}>Sort Posts by VoteScore</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

// Add State to the props of the MainPage component
function mapStateToProps({ posts }) {
    return {
        posts: posts.posts
    }
}

// Pass event handler from Action Creators
function mapDispatchToProps(dispatch) {
    return {
        getPosts: (data) => dispatch(getPosts(data)),
        deletePost: (data) => dispatch(deletePost(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);