import React, { Component } from 'react';
import { connect } from 'react-redux';
import serialize from 'form-serialize';
import cuid from 'cuid';
import { addComment } from './CommentActions';

class AddComment extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        const { history } = this.props;
        const formValues = serialize(event.target, { hash: true });
        const datetime = Date.now();

        const newPost = Object.assign({
            id: cuid(),
            parentId: this.props.match.params.id,
            timestamp: datetime,
            voteScore: 1,
            deleted: false,
            parentDeleted: false,
        }, formValues);

        this.props.addComment(newPost);
        history.push('/posts/' + this.props.match.params.id);
    }
    render() {
        return (
            <div className="w3-content comment_form_container">
				<form onSubmit={this.handleSubmit}>
					<div className="w3-container w3-blue">
						<h2 className="w3-center">New Comment</h2>
					</div>
					<div className="w3-row w3-section">
						<label htmlFor="post_author" className="w3-col comment_inputs">Author:</label>
						<div className="w3-rest">
							<input type="text" className="w3-input" id="post_author" name="author" />
						</div>
					</div>

					<div className="w3-row w3-section">
						<label htmlFor="post_body" className="w3-col comment_inputs">Body:</label>
						<div className="w3-rest">
							<textarea rows="6" className="w3-input" id="post_body" name="body"></textarea>
						</div>
					</div>

					<button type="submit" className="w3-button w3-block w3-section w3-blue w3-ripple w3-padding">Submit</button>
				</form>
			</div>
        );
    }
}

// Add State to the props of the MainPage component
function mapStateToProps({ categories, posts }) {
    return {
        posts: posts.posts
    }
}

export default connect(mapStateToProps, addComment)(AddComment);