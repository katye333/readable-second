import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../posts/PostActions';

class PostList extends Component {
    state = {
        voteLabel: "✔ By Vote Score",
        timeLabel: "By Time"
    };
    componentDidMount() {
        const category = this.props.match.params.path;
        category // is available
            ? this.props.fetchPostsByCategory(category)
            : this.props.fetchPosts()
    }

    handleSort(e) {
        const newSort = e.target.id;
        newSort === 'vote'
            ? this.props.sortByVotePosts(this.props.posts) && this.setState({ voteLabel: '✔ By Vote Score', timeLabel: 'By Time' })
            : this.props.sortByTimePosts(this.props.posts) && this.setState({ voteLabel: 'By Vote Score', timeLabel: '✔ By Time' })
    }
    render() {
        const posts = this.props.posts;
        return (
            <div className="w3-container" style={{ marginLeft: '250px', marginTop: '20px', width: '50%', marginBottom: '100px' }}>

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
				{posts.length > 0 &&
					posts.filter((obj) => {
						if (obj.deleted === false)
							return obj;
					}).map((post) => {
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
										<span
											className="fa fa-angle-up"
											style={{
												color: '#1fc51f',
												fontSize: '36px'
											}}>
										</span>
										<span style={{ fontSize: '18px', marginLeft: '5px' }}>{post.voteScore}</span>
										<span
											className="fa fa-angle-down"
											style={{
												color: 'red',
												fontSize: '36px'
											}}>
										</span>
									</div>
									<div style={{ paddingBottom: '10px' }} className="flex_column">
										<div style={{ flexDirection: 'row' }}>
											<h1><Link
													to={'/posts/'+ post.id}
													style={{ textDecoration: 'none' }}>
													{post.title}
												</Link>
											</h1>
											<strong>Author: </strong>{post.author}
										</div>
									</div>
								</div>
							</div>
							<div className="w3-container w3-padding-large">
								<p>{post.body}</p>
							</div>
							<div className="w3-container w3-blue w3-padding-large">
								<Link to={'/posts/'+ post.id} className="w3-button">View Details</Link>
							</div>
						</div>
					);
				})}
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

export default connect(mapStateToProps, actions)(PostList);