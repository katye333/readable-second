import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchComments, deleteComment, sortByVoteComments, sortByTimeComments } from './CommentActions';
import { formatDate } from '../utils/helpers';

class CommentList extends Component {
    state = {
        sort: 'vote',
        voteLabel: "✔ By Vote Score",
        timeLabel: "By Time"
    };
    componentDidMount() {
        this.props.fetchComments(this.props.postId);
    }

    handleSort(e) {
        const newSort = e.target.id;
        newSort === 'vote'
            ? this.props.sortByVoteComments(this.props.comments) && this.setState({ voteLabel: '✔ By Vote Score', timeLabel: 'By Time' })
            : this.props.sortByTimeComments(this.props.comments) && this.setState({ voteLabel: 'By Vote Score', timeLabel: '✔ By Time' })
    }
    handleDelete(comment) {
        const { history } = this.props;
        this.props.deleteComment(comment.id);
        history.push('/posts/' + this.props.postId);
    }

    render() {
        const comments = this.props.comments;
        return (
            <div className="w3-container comment_list_container">
				<div className="w3-bar" style={{ marginBottom: '10px' }}>
            		<div className="w3-dropdown-hover w3-right">
	            		<button className="w3-bar-item w3-button w3-black w3-padding-large" style={{ fontSize: '18px' }}>
	            			<span className="fa fa-sort"></span>
	            		</button>
	            		<div className="w3-dropdown-content w3-bar-block w3-border" style={{ marginTop: '2.2%' }}>
	            			<a id="vote" className="w3-bar-item w3-button" onClick={this.handleSort.bind(this)}>{this.state.voteLabel}</a>
	            			<a id="time" className="w3-bar-item w3-button" onClick={this.handleSort.bind(this)}>{this.state.timeLabel}</a>
	            		</div>
		            </div>
		            <Link to={'/'+ this.props.postId + '/newComment'} className="w3-bar-item w3-button w3-green w3-padding-large w3-right" style={{ fontSize: '18px' }}>
	            		<span className="fa fa-plus"></span>
	            		&nbsp; New Comment
	            	</Link>
	            </div>

	            <ul className="w3-ul">
					{comments.length > 0 &&
						comments.filter((obj) => {
							if (obj.deleted === false && obj.parentDeleted === false)
								return obj;
						}).map((comment) => {
							return (
								<li
									key={comment.id}
									className="w3-bar flex_column"
									style={{
										justifyContent: 'space-between'
									}}>
									<div className="flex_row" style={{ justifyContent: 'space-between' }}>
										<div className="w3-bar-item flex_row">
											<div className="flex_column" style={{ padding: '10px' }}>
												<div><strong>Author: </strong>{comment.author}</div>
												<div><strong>Posted At: </strong>{formatDate(comment.timestamp)}</div>
											</div>
										</div>
										<div className="w3-bar-item">
											<div className="flex_row">
												<div
													className="flex_column"
													style={{
														justifyContent: 'center',
														marginRight: '20px'
													}}>
													<span
														className="fa fa-angle-up"
														style={{
															color: '#1fc51f',
															fontSize: '36px'
														}}>
													</span>
													<span style={{ fontSize: '18px', marginLeft: '5px' }}>{comment.voteScore}</span>
													<span
														className="fa fa-angle-down"
														style={{
															color: 'red',
															fontSize: '36px'
														}}>
													</span>
												</div>
											</div>
										</div>
									</div>
									<div className="w3-bar-item">
										<div>{comment.body}</div>
									</div>
									<div className="w3-bar-item">
										<Link to={'/comments/edit/'+ comment.id} className="w3-btn w3-blue">Edit Comment</Link>
										<button type="button" className="w3-btn w3-red" onClick={() => this.handleDelete(comment)}>Delete Comment</button>
									</div>
								</li>
							);
						})
					}
				</ul>
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
        fetchComments: (data) => dispatch(fetchComments(data)),
        deleteComment: (data) => dispatch(deleteComment(data)),
        sortByVoteComments: (data) => dispatch(sortByVoteComments(data)),
        sortByTimeComments: (data) => dispatch(sortByTimeComments(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);