import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PostAPI } from '../utils/api';
import { getPostById } from '../actions';
import { formatDate } from '../utils/helpers';

class Post extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		const postId = this.props.match.params.id;
		dispatch(getPostById(postId));
    }
	render() {
		const post = this.props.posts.posts;
		return (
			<ul>
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
function mapStateToProps(state) {
	const { posts, postIsFetching } = state;
    return {
        posts,
        postIsFetching
    }
}

export default connect(mapStateToProps)(Post);