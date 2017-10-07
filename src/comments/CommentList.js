import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './CommentActions';
import ReactLoading from 'react-loading';
import { formatDate } from '../utils/helpers';

class CommentList extends Component {
    state = {
        sort: 'vote',
        voteLabel: "✔ By Vote Score",
        timeLabel: "By Time",
        didFireDeleteEvent: false
    };
    componentDidMount() {
        this.props.fetchComments(this.props.post.id);
    }

    shouldComponentUpdate(nextProps, nextState) {
    	return this.state.didFireDeleteEvent === true
    		? true
    		: false
    }

    componentWillUpdate(nextProps, nextState) {
    	nextProps.fetchComments(nextProps.post.id);
    }

    handleVote = (e, comment) => {
        e.preventDefault();
        const history = this.props.history;

        this.props.voteComment(comment.id, e.currentTarget.id)
        	.then(history.go('/post/' + this.props.post.id))
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

        this.setState({ didFireDeleteEvent: true });
    }

    render() {
        const comments = this.props.comments.comments;

        let noComments;
        comments.length === 0
        	? noComments = <span>No comments for this post</span>
        	: <span></span>

        let loadingGif;
        this.props.comments.fetchingComments === true
        	? loadingGif = 	<ReactLoading type='spin' color='black' height='334' width='175' />
        	: loadingGif =	(
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
        					)
        return (
            <div className="w3-container comment_list_container post_container">
				{loadingGif}

	            <ul className="w3-ul">
					{comments.length > 0 &&
						comments.map((comment) => {
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
													<button type="button" id="upVote" className="w3-button w3-circle" onClick={(e) => this.handleVote(e, comment)}>
														<span
															className="fa fa-angle-up"
															style={{
																color: '#1fc51f',
																fontSize: '36px'
															}}>
														</span>
													</button>
													<span style={{ fontSize: '18px', marginLeft: '20px' }}>{comment.voteScore}</span>
													<button type="button" id="downVote" className="w3-button w3-circle" onClick={(e) => this.handleVote(e, comment)}>
														<span
															className="fa fa-angle-down"
															style={{
																color: 'red',
																fontSize: '36px'
															}}>
														</span>
													</button>
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
					{noComments}
				</ul>
			</div>
        );
    }
}

// Add State to the props of the MainPage component
function mapStateToProps({ comments }) {
    return {
        comments: comments
    }
}

export default connect(mapStateToProps, actions)(CommentList);