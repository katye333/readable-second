import React, { Component } from 'react';
import { connect } from 'react-redux';
import serialize from 'form-serialize';
import cuid from 'cuid';
import { CategoryAPI, PostAPI } from '../utils/api';
import { getCategories, editPost } from '../actions';

class UpdatePost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			timestamp: '',
			category: '',
			title: '',
			author: '',
			body: '',
			voteScore: '',
			deleted: false
		};
	}

	componentDidMount() {
        CategoryAPI.fetchCategories()
        	.then((categories) => {
            	this.props.getCategories(categories);
        	});

        PostAPI.getPostById(this.props.match.params.id)
			.then((post) => {
		    	this.setState({
		    		id: post.id,
		    		timestamp: post.timestamp,
		    		category: post.category,
		    		title: post.title,
		    		author: post.author,
		    		body: post.body,
		    		voteScore: post.voteScore,
		    		deleted: post.deleted
		    	})
			});
	}

	handleChange = (event) => {
		const name   = event.target.name;
		const value  = event.target.value;

		this.setState({ [name]: value })
	}

	handleEdit = (event) => {
		event.preventDefault();
		const { history } = this.props;
		const formValues = serialize(event.target, { hash: true });

		PostAPI.editPost(this.state)
			.then((post) => {
            	this.props.editPost(post);
        	})
			.then(data => history.push('/posts'))
	}
	render() {
		return (
			<div className="container">
				<form onSubmit={this.handleEdit}>
					<fieldset>
						<legend>Edit Post</legend>

						<div className="form-group row">
							<label htmlFor="post_category" className="col-sm-2">Category</label>
							<div className="col-sm-4">
								<select className="form-control" id="post_category" name="category" value={this.state.category} onChange={this.handleChange}>
									<option></option>

									{this.props.categories.map((category) => {
										return (
											<option key={category.name} value={category.name}>{category.name}</option>
										);
									})}
								</select>
							</div>
						</div>

						<div className="form-group row">
							<label htmlFor="post_title" className="col-sm-2">Title</label>
							<div className="col-sm-6">
								<input className="form-control" type="text" id="post_title" name="title" value={this.state.title} onChange={this.handleChange} />
							</div>
						</div>

						<div className="form-group row">
							<label htmlFor="post_author" className="col-sm-2">Author</label>
							<div className="col-sm-6">
								<input type="text" className="form-control" id="post_author" name="author" value={this.state.author} onChange={this.handleChange} />
							</div>
						</div>

						<div className="form-group row">
							<label htmlFor="post_body" className="col-sm-2">Body</label>
							<div className="col-sm-6">
								<textarea rows="6" className="form-control" id="post_body" name="body" value={this.state.body} onChange={this.handleChange}></textarea>
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
        categories: categories.categories,
        posts: posts.posts
    }
}

// Pass event handler from Action Creators
function mapDispatchToProps(dispatch) {
    return {
        getCategories: (data) => dispatch(getCategories(data)),
        editPost: (data) => dispatch(editPost(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePost);