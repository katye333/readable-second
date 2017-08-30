import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import Home from './Home';
import CategoryList from './CategoryList';
import PostList from './PostList';
import AddPost from './AddPost';
import Post from './Post';
import UpdatePost from './UpdatePost';

class App extends Component {
    render() {

    	// Define routes and add components
        return (
        	<div className="route-container">
	    		<Route path="/" component={ Home } />
	    		<Route exact path="/categories" component={ CategoryList } />
	    		<Route exact path="/posts" component={ PostList } />
	    		<Route exact path="/categories/:path" component={ PostList } />
	    	</div>
        );
    }
}

export default App;