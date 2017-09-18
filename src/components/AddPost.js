import React, { Component } from 'react';
import { connect } from 'react-redux';
import serialize from 'form-serialize';
import cuid from 'cuid';
import { fetchCategories, addPost } from '../actions';

class AddPost extends Component {
    state = {
        category: '',
        title: '',
        author: '',
        body: ''
    };
    componentDidMount() {
        this.props.fetchCategories();
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const { history } = this.props;
        const formValues = serialize(event.target, { hash: true });
        const datetime = Date.now();

        const newPost = Object.assign({
            id: cuid(),
            timestamp: datetime,
            voteScore: 1,
            deleted: false,
        }, formValues);

        this.props.addPost(newPost)
        history.push('/posts')
    }
    render() {
        return (
            <div className="container">
				<form onSubmit={this.handleSubmit}>
					<fieldset>
						<legend>New Post</legend>

						<div className="form-group row">
							<label htmlFor="post_category" className="col-sm-2">Category</label>
							<div className="col-sm-4">
								<select className="form-control" id="post_category" name="category">
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
								<input className="form-control" type="text" id="post_title" name="title" />
							</div>
						</div>

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
        categories: categories.categories
    }
}

// Pass event handler from Action Creators
function mapDispatchToProps(dispatch) {
    return {
        fetchCategories: (data) => dispatch(fetchCategories(data)),
        addPost: (data) => dispatch(addPost(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);