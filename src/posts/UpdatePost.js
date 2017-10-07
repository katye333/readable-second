import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../categories/CategoryActions'
import { fetchPostById, editPost } from '../posts/PostActions';

class UpdatePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
        	isError: false,
    		inputContainerClasses: 'w3-rest',
    		labelClasses: 'w3-col post_inputs',
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
    componentWillMount() {
    	this.props.fetchCategories()
    }
    componentDidMount() {
        let p1 = new Promise((res, rej) => {
            res(this.props.fetchPostById(this.props.match.params.id));
        });

        Promise.all([p1]).then(values => {
            values.forEach(obj => {
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
            });
        });
    }

    handleValidation = (event) => {
    	this.state.title === ''
    		? this.setState({ isError: true, labelClasses: 'w3-col post_inputs label_error', inputContainerClasses: 'w3-rest input_error' })
    		: this.setState({ isError: false, labelClasses: 'w3-col post_inputs', inputContainerClasses: 'w3-rest' })
    	this.state.body === ''
    		? this.setState({ isError: true, labelClasses: 'w3-col post_inputs label_error', inputContainerClasses: 'w3-rest input_error' })
    		: this.setState({ isError: false, labelClasses: 'w3-col post_inputs', inputContainerClasses: 'w3-rest' })

    	return this.state.isError;
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
        console.log(this.state.category)
        const { history } = this.props;

        if (this.handleValidation(event) === false)
        {
			this.props.editPost(this.state);
        	history.push('/posts');
        }
        else {
        	alert('Please fill in all required fields')
        }
    }
    render() {
        return (
			<div className="w3-content" className="post_form_container post_container">
            	<div className="w3-container w3-blue">
            		<h2 className="w3-center">Edit Post</h2>
            	</div>

				<form onSubmit={this.handleEdit} className="w3-container w3-card-4">
					<div className="w3-row w3-section">
						<label htmlFor="post_category" className="w3-col post_inputs" style={{ color: '#727272' }}>Category:</label>
						<div className="w3-rest">
							<select
								id="post_category"
								className="w3-select"
								name="category"
								value={this.state.category}
								disabled="disabled">
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
						<label htmlFor="post_author" className="w3-col post_inputs" style={{ color: '#727272' }}>Author:</label>
						<div className="w3-rest">
							<input
								type="text"
								className="w3-input"
								id="post_author"
								name="author"
								value={this.state.author}
								disabled="disabled" />
						</div>
					</div>
					<div className="w3-row w3-section">
						<label htmlFor="post_title" className={this.state.labelClasses}>Title:</label>
						<div className={this.state.inputContainerClasses}>
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
						<label htmlFor="post_body" className={this.state.labelClasses}>Body:</label>
						<div className={this.state.inputContainerClasses}>
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