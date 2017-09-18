import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchComments, deleteComment } from '../actions';
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

    handleSort(event) {
        event.preventDefault();
        const newSort = event.target.id;

        if (this.state.sort !== newSort)
            this.setState({ sort: newSort })

        newSort === 'vote'
            ? this.setState({ voteLabel: '✔ By Vote Score', timeLabel: 'By Time' })
            : this.setState({ voteLabel: 'By Vote Score', timeLabel: '✔ By Time' })
    }
    handleDelete(comment) {
        const { history, dispatch } = this.props;
        this.props.deleteComment(comment.id);
        history.push('/posts/' + this.props.match.params.id)
    }

    render() {
        const comments = this.props.comments;
        return (
            <div className="container">
				<div className="row">
					<div className="col-sm-offset-1 col-sm-8">
						<ul className="list-group">
							<li id="vote" className="list-group-item sort_list" onClick={this.handleSort.bind(this)}>{this.state.voteLabel}</li>
							<li id="time" className="list-group-item sort_list" onClick={this.handleSort.bind(this)}>{this.state.timeLabel}</li>
						</ul>
						{comments.length > 0 &&
							comments.filter((obj) => {
								if (obj.deleted === false && obj.parentDeleted === false)
									return obj;
							}).map((comment) => {
								return (
									<div key={comment.id} className="panel panel-default">
										<div className="panel-heading" key={comment.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
											<div style={{ display: 'flex', flexDirection: 'row' }}>
												<div style={{ padding: '10px', display: 'flex', flexDirection: 'column' }}>
													<div><strong>Author: </strong>{comment.author}</div>
													<div><strong>Posted At: </strong>{formatDate(comment.timestamp)}</div>
												</div>
											</div>
											<div>
												<div style={{ display: 'flex', flexDirection: 'row' }}>
													<span style={{ paddingTop: '20px', fontSize: '18px' }}>{comment.voteScore}</span>
													<div style={{ display: 'flex', flexDirection: 'column', marginTop: '5px' }}>
														<span className="glyphicon glyphicon-arrow-up" style={{ padding: '5px', fontSize: '20px', color: '#1fc51f' }}></span>
														<span className="glyphicon glyphicon-arrow-down" style={{ padding: '5px', fontSize: '20px', color: 'red' }}></span>
													</div>
												</div>
											</div>
										</div>
										<div className="panel-body">
											<div>{comment.body}</div>
										</div>
										<div className="panel-footer">
											<div className="btn-group">
												<Link to={'/comments/edit/'+ comment.id} className="btn btn-default">Edit Comment</Link>
												<button type="button" className="btn btn-default" onClick={() => this.handleDelete(comment)}>Delete Comment</button>
											</div>
										</div>
									</div>
								);
							})
						}
						<Link to={'/'+ this.props.postId + '/newComment'} className="btn btn-default">New Comment</Link>
					</div>
				</div>
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
        deleteComment: (data) => dispatch(deleteComment(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);