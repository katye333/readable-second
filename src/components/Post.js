import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PostAPI } from '../utils/api';
import { getPosts } from '../actions';
import { formatDate } from '../utils/helpers';

class Post extends Component {
	componentDidMount() {
		PostAPI.getPostById(this.props.match.params.id)
			.then((posts) => {
		    	this.props.getPosts(posts);
			});
    }
	render() {
		const post = this.props.posts;
		return (
			<ul key={post.id}>
				<li><strong>Title</strong>: {post.title}</li>
				<li><strong>Author</strong>: {post.author}</li>
				<li><strong>Timestamp</strong>: {formatDate(post.timestamp)}</li>
				<li><strong>VoteScore</strong>: {post.voteScore}</li>
				<li><strong>Category</strong>: {post.category}</li>
			</ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(Post);