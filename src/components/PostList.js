import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostAPI } from '../utils/api';
import { getPosts } from '../actions';
import { formatDate } from '../utils/helpers';

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
		console.log(this.props.posts)
		return (
			<div className="row">
				<div className="col-sm-6">
					<div>
						{this.props.posts.map((post) => {
							return (
								<ul key={post.id}>
									<li><strong>Title</strong>: <Link to={"/posts/"+post.id}>{post.title}</Link></li>
									<li><strong>Author</strong>: {post.author}</li>
									<li><strong>Timestamp</strong>: {formatDate(post.timestamp)}</li>
									<li><strong>VoteScore</strong>: {post.voteScore}</li>
								</ul>
							);
						})}
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