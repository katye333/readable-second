import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PostAPI } from '../utils/api';
import { fetchPostById } from '../actions';
import { formatDate } from '../utils/helpers';

class Post extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        const postId = this.props.match.params.id;

        this.props.fetchPostById(postId)
    }
    render() {
        const post = this.props.posts;
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
function mapStateToProps({ posts }) {
    return {
        posts: posts.posts
    }
}

// Pass event handler from Action Creators
function mapDispatchToProps(dispatch) {
    return {
        fetchPostById: (data) => dispatch(fetchPostById(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);