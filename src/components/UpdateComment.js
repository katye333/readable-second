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
            <div className="container">
				<form onSubmit={this.handleEdit}>
					<fieldset>
						<legend>Edit Comment</legend>

						<div className="form-group row">
							<label htmlFor="comment_author" className="col-sm-2">Author</label>
							<div className="col-sm-6">
								<input
									type="text"
									className="form-control"
									id="comment_author"
									name="author"
									value={this.state.author}
									onChange={this.handleChange} />
							</div>
						</div>

						<div className="form-group row">
							<label htmlFor="comment_body" className="col-sm-2">Body</label>
							<div className="col-sm-6">
								<textarea
									rows="6"
									className="form-control"
									id="comment_body"
									name="body"
									value={this.state.body}
									onChange={this.handleChange}></textarea>
							</div>
						</div>

						<div className="form-group row">
							<div className="col-sm-offset-2 col-sm-2">
								<button
									type="submit"
									className="btn btn-lg btn-primary">Submit</button>
							</div>
						</div>
					</fieldset>
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