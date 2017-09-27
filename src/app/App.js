import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import CategoryList from '../categories/CategoryList';
import PostList from '../posts/PostList';
import AddPost from '../posts/AddPost';
import Post from '../posts/Post';
import UpdatePost from '../posts/UpdatePost';
import AddComment from '../comments/AddComment';
import UpdateComment from '../comments/UpdateComment';

class App extends Component {
    render() {

        // Define routes and add components
        return (
            <div className="w3-container">
	    		<Route path="/" component={ Home } />
	    		<Route exact path="/" component={ CategoryList } />
	    		<Route exact path="/categories" component={ CategoryList } />
	    		<Route path="/categories/:path" component={ PostList } />
	    		<Route exact path="/posts" component={ PostList } />
	    		<Route path="/posts/:id" component={ Post } />
				<Route exact path="/newPost" component={ AddPost } />
				<Route path="/edit/:id" component={ UpdatePost } />
				<Route path="/delete/:id" component={ PostList } />
				<Route path="/:id/newComment" component={ AddComment } />
				<Route path="/comments/edit/:commentId" component={ UpdateComment } />
	    	</div>
        );
    }
}

export default App;