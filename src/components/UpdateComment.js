import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCommentById, editComment } from '../actions';

class UpdateComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            parentId: "",
            timestamp: "",
            author: "",
            body: "",
            voteScore: "",
            deleted: false,
            parentDeleted: false
        }
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
                    })
                }
            })
        });
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        })
    }

    handleEdit = (event) => {
        event.preventDefault();
        const { history } = this.props;

        this.props.editComment(this.state)
        history.push('/posts/' + this.state.parentId)
    }
    render() {
        return (
            <div className="w3-content" style={{ marginLeft: '200px', marginTop: '20px', width: '50%' }}>
				<form onSubmit={this.handleEdit}>
					<div className="w3-container w3-blue">
            			<h2 className="w3-center">Edit Comment</h2>
            		</div>

					<div className="w3-row w3-section">
						<label htmlFor="comment_author" className="w3-col" style={{ width: '15%', fontWeight: '900' }}>Author:</label>
						<div className="w3-rest">
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
						<label htmlFor="comment_body" className="w3-col" style={{ width: '15%', fontWeight: '900' }}>Body:</label>
						<div className="w3-rest">
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

// Pass event handler from Action Creators
function mapDispatchToProps(dispatch) {
    return {
        fetchCommentById: (data) => dispatch(fetchCommentById(data)),
        editComment: (data) => dispatch(editComment(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateComment);