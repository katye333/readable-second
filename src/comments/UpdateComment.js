import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCommentById, editComment } from './CommentActions';

class UpdateComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
        	isError: false,
    		inputContainerClasses: 'w3-rest',
    		labelClasses: 'w3-col post_inputs',
            id: '',
            parentId: '',
            timestamp: '',
            author: '',
            body: '',
            voteScore: '',
            deleted: false,
            parentDeleted: false
        };
    }

    componentDidMount() {
        let p2 = new Promise((res, rej) => {
            res(this.props.fetchCommentById(this.props.match.params.commentId))
        });

        Promise.all([p2]).then(values => {
            values.forEach(obj => {
                if (obj.type === 'CATEGORY_RECEIVE')
                    this.setState({ categoryList: obj })
                else {
                    this.setState({
                        id: obj.comments.id,
                        parentId: obj.comments.parentId,
                        timestamp: obj.comments.timestamp,
                        author: obj.comments.author,
                        body: obj.comments.body,
                        voteScore: obj.comments.voteScore,
                        deleted: obj.comments.deleted,
                        parentDeleted: obj.comments.parentDeleted
                    });
                }
            });
        });
    }

    handleValidation = (event) => {
    	this.state.author === ''
    		? this.setState({ isError: true, labelClasses: 'w3-col comment_inputs label_error', inputContainerClasses: 'w3-rest input_error' })
    		: this.setState({ isError: false, labelClasses: 'w3-col comment_inputs', inputContainerClasses: 'w3-rest' })
    	this.state.body === ''
    		? this.setState({ isError: true, labelClasses: 'w3-col comment_inputs label_error', inputContainerClasses: 'w3-rest input_error' })
    		: this.setState({ isError: false, labelClasses: 'w3-col comment_inputs', inputContainerClasses: 'w3-rest' })

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
        const { history } = this.props;

        if (this.handleValidation(event) === false)
        {
			this.props.editComment(this.state);
        	history.goBack();
        }
        else {
        	alert('Please fill in all required fields')
        }
    }
    render() {
        return (
            <div className="w3-content" className="comment_form_container post_container">
				<form onSubmit={this.handleEdit}>
					<div className="w3-container w3-blue">
            			<h2 className="w3-center">Edit Comment</h2>
            		</div>

					<div className="w3-row w3-section">
						<label htmlFor="comment_author" className={this.state.labelClasses}>Author:</label>
						<div className={this.state.inputContainerClasses}>
							<input
								type="text"
								className="w3-input"
								id="comment_author"
								name="author"
								value={this.state.author}
								onChange={this.handleChange} />
						</div>
					</div>
					<div className="w3-row w3-section">
						<label htmlFor="comment_body" className={this.state.labelClasses}>Body:</label>
						<div className={this.state.inputContainerClasses}>
							<textarea
								rows="6"
								className="w3-input"
								id="comment_body"
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
function mapStateToProps({ comments }) {
    return {
        comments: comments.comments
    }
}

export default connect(mapStateToProps, { fetchCommentById, editComment })(UpdateComment);