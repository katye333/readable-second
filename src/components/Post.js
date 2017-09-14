import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPostById } from '../actions';
import { formatDate } from '../utils/helpers';
import CommentList from './CommentList';

class Post extends Component {
    state = {
        showComments: false,
        commentContainerClass: 'hidden'
    };
    componentDidMount() {
        const postId = this.props.match.params.id;
        this.props.fetchPostById(postId)
    }
    handleExpand() {
        this.state.showComments === false
            ? this.setState({ showComments: true, commentContainerClass: '' })
            : this.setState({ showComments: false, commentContainerClass: 'hidden' })
    }
    render() {
        const post = this.props.post;
        return (
            <div className="container">
				<div className="row">
					<div className="col-sm-offset-3 col-sm-6">
			            <div key={post.id} className="panel panel-default">
							<div className="panel-heading" key={post.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
								<div style={{ display: 'flex', flexDirection: 'row' }}>
									<span className="glyphicon glyphicon-user" style={{ padding: '10px', paddingTop: '20px' }}></span>
									<div style={{ padding: '10px', display: 'flex', flexDirection: 'column' }}>
										<div style={{ flexDirection: 'row' }}>
											<strong>Title</strong>: {post.title}
										</div>
										<div><strong>Author</strong>: {post.author}</div>
									</div>
								</div>
								<div>
									<div style={{ display: 'flex', flexDirection: 'row' }}>
										<span style={{ paddingTop: '20px', fontSize: '18px' }}>{post.voteScore}</span>
										<div style={{ display: 'flex', flexDirection: 'column', marginTop: '5px' }}>
											<span className="glyphicon glyphicon-arrow-up" style={{ padding: '5px', fontSize: '20px', color: '#1fc51f' }}></span>
											<span className="glyphicon glyphicon-arrow-down" style={{ padding: '5px', fontSize: '20px', color: 'red' }}></span>
										</div>
									</div>
								</div>
							</div>
							<div className="panel-body">
								<div><strong>Posted At: </strong>: {formatDate(post.timestamp)}</div>
								<div><strong>Category</strong>: {post.category}</div>
								<div>{post.body}</div>

								<div className={this.state.commentContainerClass}>
									<hr />
									<CommentList postId={post.id} />
								</div>
							</div>
							<div className="panel-footer">
								<button type="button" className="btn btn-default" onClick={this.handleExpand.bind(this)}>View Comments</button>
								<div className="btn-group pull-right">
									<Link to={'/edit/'+ post.id} className="btn btn-default">Edit Post</Link>
									<button type="button" className="btn btn-default" onClick={() => this.handleDelete(post)}>Delete Post</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
        );
    }
}

// Add State to the props of the MainPage component
function mapStateToProps({ posts }) {
    return {
        post: posts.posts
    }
}

// Pass event handler from Action Creators
function mapDispatchToProps(dispatch) {
    return {
        fetchPostById: (data) => dispatch(fetchPostById(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);