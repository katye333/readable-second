import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostAPI } from '../utils/api';
import _ from 'lodash';
import { getPostsAll, getsPostsByCategory, deletePost } from '../actions';
import { formatDate } from '../utils/helpers';
import AddPost from './AddPost';

class PostList extends Component {
	state = {
    	sort: 'vote',
    	voteLabel: "✔ By Vote Score",
    	timeLabel: "By Time"
  	};
	componentDidMount() {
		const { dispatch } = this.props;
		const category = this.props.match.params.path;

		category // is available
			? dispatch(getsPostsByCategory(category))
			: dispatch(getPostsAll(category));
    }

  	handleSort(e) {
  		const newSort = e.target.id;

  		if (this.state.sort !== newSort)
  			this.setState({ sort: newSort })

  		newSort === 'vote'
  			? this.setState({ voteLabel: '✔ By Vote Score', timeLabel: 'By Time' })
  			: this.setState({ voteLabel: 'By Vote Score', timeLabel: '✔ By Time' })
  	}

  	handleDelete(post) {
  		const { history } = this.props;
  		const id = post.id;
  		PostAPI.deletePost(post.id)
			.then((thisPost) => {
            	this.props.deletePost(id);
        	})
			.then(data => history.push('/posts'))
  	}
	render() {
		const posts = this.props.posts;
		let sortedPosts = (this.state.sort === 'vote'
    		? _.sortBy(posts.posts, 'voteScore').reverse()
    		: _.sortBy(posts.posts, 'timestamp').reverse())

		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-offset-3 col-sm-6">
						{sortedPosts.map((post) => {
							return (
								<div key={post.id} className="panel panel-default">
									<div className="panel-heading" key={post.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
										<div style={{ display: 'flex', flexDirection: 'row' }}>
											<span className="glyphicon glyphicon-user" style={{ padding: '10px', paddingTop: '20px' }}></span>
											<div style={{ padding: '10px', display: 'flex', flexDirection: 'column' }}>
												<div style={{ flexDirection: 'row' }}>
													<strong>Title</strong>: <Link to={'/posts/'+ post.id}>{post.title}</Link>
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

										<div className="hidden" id="comment_container">
											<hr />

										</div>
									</div>
									<div className="panel-footer">
										<button type="button" className="btn btn-default" onClick={this.handleExpand}>View Comments</button>
										<div className="btn-group pull-right">
											<Link to={'/edit/'+ post.id} className="btn btn-default">Edit Post</Link>
											<button type="button" className="btn btn-default" onClick={() => this.handleDelete(post)}>Delete Post</button>
										</div>
									</div>
								</div>
							);
						})}

						<Link to="/newPost" className="btn btn-primary">Create New Post</Link>

						<ul className="list-group">
							<li id="vote" className="list-group-item sort_list" onClick={this.handleSort.bind(this)}>{this.state.voteLabel}</li>
							<li id="time" className="list-group-item sort_list" onClick={this.handleSort.bind(this)}>{this.state.timeLabel}</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

// Add State to the props of the MainPage component
// Add State to the props of the MainPage component
function mapStateToProps(state) {
	const { posts, postIsFetching } = state;
    return {
        posts,
        postIsFetching
    }
}

export default connect(mapStateToProps)(PostList);