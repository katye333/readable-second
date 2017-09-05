import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostAPI } from '../utils/api';
import _ from 'lodash';
import { getPosts } from '../actions';
import { formatDate } from '../utils/helpers';
import AddPost from './AddPost';

class PostList extends Component {
	componentDidMount() {
		if (this.props.match.params.path) {
			PostAPI.fetchPostsByCategory(this.props.match.params.path)
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
	render() {
		return (
			<div class="container">
				<div className="row">
					<div className="col-sm-offset-3 col-sm-6">
						{_.isArray(this.props.posts) && this.props.posts.map((post) => {
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
										<div><strong>Timestamp</strong>: {formatDate(post.timestamp)}</div>
										<div><strong>VoteScore</strong>: {post.voteScore}</div>
										<div><strong>Category</strong>: {post.category}</div>
										<div>{post.body}</div>
									</div>
								</div>
							);
						})}
						<Link to="/newPost" className="btn btn-primary">Create New Post</Link>
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
        getPosts: (data) => dispatch(getPosts(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);