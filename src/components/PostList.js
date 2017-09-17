import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { fetchPosts, fetchPostsByCategory, deletePost } from '../actions';
import { formatDate } from '../utils/helpers';

class PostList extends Component {
    state = {
        sort: 'vote',
        voteLabel: "✔ By Vote Score",
        timeLabel: "By Time"
    };
    componentDidMount() {
        const category = this.props.match.params.path;

        category // is available
            ? this.props.fetchPostsByCategory(category)
            : this.props.fetchPosts();
    }

    handleSort(e) {
        const newSort = e.target.id;

        if (this.state.sort !== newSort)
            this.setState({ sort: newSort })

        newSort === 'vote'
            ? this.setState({ voteLabel: '✔ By Vote Score', timeLabel: 'By Time' })
            : this.setState({ voteLabel: 'By Vote Score', timeLabel: '✔ By Time' })
    }
    render() {
        const posts = this.props.posts;
        let sortedPosts;

        if (this.state.sort === 'vote') {
            if (posts && posts.length && posts.length > 0) {
                sortedPosts = _.sortBy(posts, 'voteScore').reverse();
            } else {
                sortedPosts = posts;
            }
        } else {
            if (posts && posts.length && posts.length > 0) {
                sortedPosts = _.sortBy(posts, 'timestamp').reverse();
            } else {
                sortedPosts = posts;
            }
        }
        return (
            <div className="container">
				<div className="row">
					<div className="col-sm-offset-1 col-sm-10">
						{sortedPosts.length > 0 &&
							sortedPosts.filter((obj) => {
								if (obj.deleted === false)
									return obj;
							}).map((post) => {
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
									</div>
									<div className="panel-footer"></div>
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
function mapStateToProps({ categories, posts }) {
    return {
        categories: categories.categories,
        posts: posts.posts
    }
}

// Pass event handler from Action Creators
function mapDispatchToProps(dispatch) {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        fetchPostsByCategory: (data) => dispatch(fetchPostsByCategory(data)),
        deletePost: (data) => dispatch(deletePost(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);