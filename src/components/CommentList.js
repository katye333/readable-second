import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchComments } from '../actions';
import { formatDate } from '../utils/helpers';

class CommentList extends Component {
    componentDidMount() {
        this.props.fetchComments(this.props.postId)
    }

    render() {
        const comments = this.props.comments;
        return (
            <div className="container">
				<div className="row">
					<div className="col-sm-4">
						{comments.length > 0 &&
							comments.filter((obj) => {
								if (obj.deleted === false)
									return obj;
							}).map((comment) => {
							return (
								<div key={comment.id}>
									<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
										<div style={{ display: 'flex', flexDirection: 'row' }}>
											<span className="glyphicon glyphicon-user" style={{ padding: '10px', paddingTop: '20px' }}></span>
											<div style={{ padding: '10px', display: 'flex', flexDirection: 'column' }}>
												<div style={{ flexDirection: 'row' }}>
													<strong>Title</strong>: <Link to={'/comment/'+ comment.id}>{comment.title}</Link>
												</div>
												<div><strong>Author</strong>: {comment.author}</div>
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
										<div><strong>Posted At: </strong>: {formatDate(comment.timestamp)}</div>
										<div>{comment.body}</div>
									</div>
									<div className="panel-footer"></div>
								</div>
							);
						})}
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
        fetchComments: (data) => dispatch(fetchComments(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);