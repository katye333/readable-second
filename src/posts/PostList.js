import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts, fetchPostsByCategory, votePost, sortByTimePosts, sortByVotePosts } from '../posts/PostActions';
import { fetchComments } from '../comments/CommentActions';
import ReactLoading from 'react-loading';
import _ from 'lodash';

class PostList extends Component {
    state = {
        voteLabel: "✔ By Vote Score",
        timeLabel: "By Time",
    };
    componentDidMount() {
    	const category = this.props.match.params.path;
        category // is available
            ? this.props.fetchPostsByCategory(category).then((result) => this.props.fetchComments(result))
            : this.props.fetchPosts().then((result) => this.props.fetchComments(result))
    }
    handleVote = (e, post) => {
        e.preventDefault();
        const history = this.props.history;

        this.props.votePost(post.id, e.currentTarget.id)
        	.then(history.go('/post/' + post.id))
    }
    handleSort(e) {
        const newSort = e.target.id;
        newSort === 'vote'
            ? this.props.sortByVotePosts(this.props.posts.posts) && this.setState({ voteLabel: '✔ By Vote Score', timeLabel: 'By Time' })
            : this.props.sortByTimePosts(this.props.posts.posts) && this.setState({ voteLabel: 'By Vote Score', timeLabel: '✔ By Time' })
    }
    commentCount(comments, postId) {
    	for (let count in comments) {
    		if (postId === count)
    			return comments[count]
    		else
    			return 0
    	}
    }
    render() {
        const posts = this.props.posts.posts;
        let comments = _.countBy(this.props.comments, 'parentId')

        let loadingGif;
        this.props.posts.fetchingPosts === true
        	? loadingGif = 	<ReactLoading type='spin' color='black' height='334' width='175' />
        	: loadingGif =	(
				            	<div className="w3-bar" style={{ marginBottom: '10px' }}>
					            	<Link to="/newPost" className="w3-bar-item w3-button w3-green w3-padding-large" style={{ fontSize: '18px' }}>
					            		<span className="fa fa-plus"></span>
					            		&nbsp; New Post
					            	</Link>

				            		<div className="w3-dropdown-hover w3-right">
					            		<button className="w3-bar-item w3-button w3-black w3-padding-large" style={{ fontSize: '18px' }}>
					            			<span className="fa fa-sort"></span>
					            		</button>
					            		<div className="w3-dropdown-content w3-bar-block w3-border" style={{ marginTop: '2.2%' }}>
					            			<a id="vote" className="w3-bar-item w3-button" onClick={this.handleSort.bind(this)}>{this.state.voteLabel}</a>
					            			<a id="time" className="w3-bar-item w3-button" onClick={this.handleSort.bind(this)}>{this.state.timeLabel}</a>
					            		</div>
						            </div>
					            </div>
        					)

        return (
            <div className="w3-container post_container" style={{ marginLeft: '250px', marginTop: '20px', width: '50%' }}>
            	{loadingGif}

				{posts.length > 0 &&
					posts.map((post) => {
					return (
						<div key={post.id} className="w3-card-4" style={{ marginBottom: '20px' }}>
							<div className="w3-container w3-blue" key={post.id}>
								<div className="flex_row">
									<div
										className="flex_column"
										style={{
											justifyContent: 'center',
											marginRight: '20px'
										}}>
										<button type="button" id="upVote" className="w3-button w3-circle" onClick={(e) => this.handleVote(e, post)}>
											<span
												className="fa fa-angle-up"
												style={{
													color: '#1fc51f',
													fontSize: '36px'
												}}>
											</span>
										</button>
										<span style={{ fontSize: '18px', marginLeft: '20px' }}>{post.voteScore}</span>
										<button type="button" id="downVote" className="w3-button w3-circle" onClick={(e) => this.handleVote(e, post)}>
											<span
												className="fa fa-angle-down"
												style={{
													color: 'red',
													fontSize: '36px'
												}}>
											</span>
										</button>
									</div>
									<div style={{ paddingBottom: '10px' }} className="flex_column">
										<div style={{ flexDirection: 'row' }}>
											<h1><Link
													to={'/categories/'+ post.category +'/'+ post.id}
													style={{ textDecoration: 'none' }}>
													{post.title}
												</Link>
											</h1>
											<strong>Author: </strong>{post.author}
											<h6>Comments: {this.commentCount(comments, post.id)}</h6>
										</div>
									</div>
								</div>
							</div>
							<div className="w3-container w3-padding-large">
								<p>{post.body}</p>
							</div>
							<div className="w3-container w3-blue w3-padding-large">
								<Link to={'/categories/'+ post.category +'/'+ post.id} className="w3-button">View Details</Link>
							</div>
						</div>
					);
				})}
			</div>
        );
    }
}

// Add State to the props of the MainPage component
function mapStateToProps({ categories, posts, comments }) {
    return {
        categories: categories.categories,
        posts: posts,
        comments: comments.comments
    }
}

export default connect(mapStateToProps, { fetchPosts, fetchPostsByCategory, votePost, sortByTimePosts, sortByVotePosts, fetchComments })(PostList);