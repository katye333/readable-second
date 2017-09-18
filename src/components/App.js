import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import CategoryList from './CategoryList';
import PostList from './PostList';
import AddPost from './AddPost';
import Post from './Post';
import UpdatePost from './UpdatePost';
import AddComment from './AddComment';
import UpdateComment from './UpdateComment';

class App extends Component {
    render() {

        // Define routes and add components
        return (
            <div className="route-container">
	    		<Route path="/" component={ Home } />
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