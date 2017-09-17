import React, { Component } from 'react';
import { connect } from 'react-redux';
import serialize from 'form-serialize';
import cuid from 'cuid';
import { addComment } from '../actions';

class AddComment extends Component {
    state = {
        author: '',
        body: ''
    };

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

        this.props.addComment(newPost)
        history.push('/posts/' + this.props.match.params.id)
    }
    render() {
        return (
            <div className="container">
				<form onSubmit={this.handleSubmit}>
					<fieldset>
						<legend>New Comment</legend>

						<div className="form-group row">
							<label htmlFor="post_author" className="col-sm-2">Author</label>
							<div className="col-sm-6">
								<input type="text" className="form-control" id="post_author" name="author" />
							</div>
						</div>

						<div className="form-group row">
							<label htmlFor="post_body" className="col-sm-2">Body</label>
							<div className="col-sm-6">
								<textarea rows="6" className="form-control" id="post_body" name="body"></textarea>
							</div>
						</div>

						<div className="form-group row">
							<div className="col-sm-offset-2 col-sm-2">
								<button type="submit" className="btn btn-lg btn-primary">Submit</button>
							</div>
						</div>
					</fieldset>
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

// Pass event handler from Action Creators
function mapDispatchToProps(dispatch) {
    return {
        addComment: (data) => dispatch(addComment(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);