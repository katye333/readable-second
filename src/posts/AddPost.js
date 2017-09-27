import React, { Component } from 'react';
import { connect } from 'react-redux';
import serialize from 'form-serialize';
import cuid from 'cuid';
import { fetchCategories } from '../categories/CategoryActions'
import { addPost } from '../posts/PostActions';

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
        });
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

        this.props.addPost(newPost);
        history.push('/posts');
    }
    render() {
        return (
            <div className="w3-content" className="post_form_container">
            	<div className="w3-container w3-blue">
            		<h2 className="w3-center">New Post</h2>
            	</div>

				<form onSubmit={this.handleSubmit} className="w3-container w3-card-4">
					<div className="w3-row w3-section">
						<label htmlFor="post_category" className="w3-col post_inputs" style={{ width: '15%', fontWeight: '900' }}>Category:</label>
						<div className="w3-rest">
							<select className="w3-select" id="post_category" name="category">
								<option></option>

								{this.props.categories.map((category) => {
									return (
										<option key={category.name} value={category.name}>{category.name}</option>
									);
								})}
							</select>
						</div>
					</div>
					<div className="w3-row w3-section">
						<label htmlFor="post_title" className="w3-col post_inputs">Title:</label>
						<div className="w3-rest">
							<input className="w3-input" type="text" id="post_title" name="title" />
						</div>
					</div>
					<div className="w3-row w3-section">
						<label htmlFor="post_author" className="w3-col post_inputs">Author:</label>
						<div className="w3-rest">
							<input type="text" className="w3-input" id="post_author" name="author" />
						</div>
					</div>
					<div className="w3-row w3-section">
						<label htmlFor="post_body" className="w3-col post_inputs">Body:</label>
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
        categories: categories.categories
    }
}

export default connect(mapStateToProps, { fetchCategories, addPost })(AddPost);