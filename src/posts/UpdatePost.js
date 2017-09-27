import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../categories/CategoryActions'
import { fetchPostById, editPost } from '../posts/PostActions';

class UpdatePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            timestamp: "",
            category: "",
            title: "",
            author: "",
            body: "",
            voteScore: "",
            deleted: false,
            categoryList: []
        };
    }

    componentDidMount() {
        let p1 = new Promise((res, rej) => {
            res(this.props.fetchCategories());
        });
        let p2 = new Promise((res, rej) => {
            res(this.props.fetchPostById(this.props.match.params.id));
        });

        Promise.all([p1, p2]).then(values => {
            values.forEach(obj => {
                if (obj.type === 'CATEGORY_RECEIVE')
                    this.setState({ categoryList: obj });
                else {
                    this.setState({
                        id: obj.posts.id,
                        timestamp: obj.posts.timestamp,
                        category: obj.posts.category,
                        title: obj.posts.title,
                        author: obj.posts.author,
                        body: obj.posts.body,
                        voteScore: obj.posts.voteScore,
                        deleted: obj.posts.deleted
                    });
                }
            });
        });
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    handleEdit = (event) => {
        event.preventDefault();
        const { history } = this.props;

        this.props.editPost(this.state);
        history.push('/posts');
    }
    render() {
        return (
			<div className="w3-content" className="post_form_container">
            	<div className="w3-container w3-blue">
            		<h2 className="w3-center">Edit Post</h2>
            	</div>

				<form onSubmit={this.handleEdit} className="w3-container w3-card-4">
					<div className="w3-row w3-section">
						<label htmlFor="post_category" className="w3-col post_inputs">Category:</label>
						<div className="w3-rest">
							<select
								id="post_category"
								className="w3-select"
								name="category"
								value={this.state.category}
								onChange={this.handleChange}>
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
							<input
								className="w3-input"
								type="text"
								id="post_title"
								name="title"
								value={this.state.title}
								onChange={this.handleChange} />
						</div>
					</div>
					<div className="w3-row w3-section">
						<label htmlFor="post_author" className="w3-col post_inputs">Author:</label>
						<div className="w3-rest">
							<input
								type="text"
								className="w3-input"
								id="post_author"
								name="author"
								value={this.state.author}
								onChange={this.handleChange} />
						</div>
					</div>
					<div className="w3-row w3-section">
						<label htmlFor="post_body" className="w3-col post_inputs">Body:</label>
						<div className="w3-rest">
							<textarea
								rows="6"
								className="w3-input"
								id="post_body"
								name="body"
								value={this.state.body}
								onChange={this.handleChange}>
							</textarea>
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
        categories: categories.categories,
        posts: posts.posts
    }
}

export default connect(mapStateToProps, { fetchCategories, fetchPostById, editPost })(UpdatePost);