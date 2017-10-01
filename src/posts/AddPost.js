import React, { Component } from 'react';
import { connect } from 'react-redux';
import serialize from 'form-serialize';
import cuid from 'cuid';
import { fetchCategories } from '../categories/CategoryActions'
import { addPost } from '../posts/PostActions';

class AddPost extends Component {
    state = {
    	isError: false,
    	inputContainerClasses: 'w3-rest',
    	labelClasses: 'w3-col post_inputs',
        category: '',
        title: '',
        author: '',
        body: ''
    };
    componentDidMount() {
        this.props.fetchCategories();
    }

    handleChange = (event) => {
    	event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }
    handleValidation = (event) => {
    	this.state.category === ''
    		? this.setState({ isError: true, labelClasses: 'w3-col post_inputs label_error', inputContainerClasses: 'w3-rest input_error' })
    		: this.setState({ isError: false, labelClasses: 'w3-col post_inputs', inputContainerClasses: 'w3-rest' })
    	this.state.title === ''
    		? this.setState({ isError: true, labelClasses: 'w3-col post_inputs label_error', inputContainerClasses: 'w3-rest input_error' })
    		: this.setState({ isError: false, labelClasses: 'w3-col post_inputs', inputContainerClasses: 'w3-rest' })
    	this.state.author === ''
    		? this.setState({ isError: true, labelClasses: 'w3-col post_inputs label_error', inputContainerClasses: 'w3-rest input_error' })
    		: this.setState({ isError: false, labelClasses: 'w3-col post_inputs', inputContainerClasses: 'w3-rest' })
    	this.state.body === ''
    		? this.setState({ isError: true, labelClasses: 'w3-col post_inputs label_error', inputContainerClasses: 'w3-rest input_error' })
    		: this.setState({ isError: false, labelClasses: 'w3-col post_inputs', inputContainerClasses: 'w3-rest' })

    	return this.state.isError;
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const { history } = this.props;

        if (this.handleValidation(event) === true)
        {
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
        else {
        	alert('Please fill in all required fields')
        }
    }
    render() {
        return (
            <div className="w3-content" className="post_form_container">
            	<div className="w3-container w3-blue">
            		<h2 className="w3-center">New Post</h2>
            	</div>

				<form onSubmit={this.handleSubmit} className="w3-container w3-card-4">
					<div className="w3-row w3-section">
						<label htmlFor="post_category" className={this.state.labelClasses} style={{ width: '15%', fontWeight: '900' }}>Category:</label>
						<div className={this.state.inputContainerClasses}>
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
						<label htmlFor="post_author" className={this.state.labelClasses}>Author:</label>
						<div className={this.state.inputContainerClasses}>
							<input type="text" className="w3-input" id="post_author" name="author" />
						</div>
					</div>
					<div className="w3-row w3-section">
						<label htmlFor="post_title" className={this.state.labelClasses}>Title:</label>
						<div className={this.state.inputContainerClasses}>
							<input className="w3-input" type="text" id="post_title" name="title" />
						</div>
					</div>

					<div className="w3-row w3-section">
						<label htmlFor="post_body" className={this.state.labelClasses}>Body:</label>
						<div className={this.state.inputContainerClasses}>
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