import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
        	<div className="header_container">
	            <div
	            	className="w3-sidebar w3-bar-block w3-win-metro-dark-purple w3-col"
	            	style={{
	            		width: '200px',
	            		marginLeft: '-20px'
	            	}}>
	                <Link to="/" className="w3-bar-item w3-button">Home</Link>
					<Link to="/categories" className="w3-bar-item w3-button">Categories</Link>
					<Link to="/posts" className="w3-bar-item w3-button">Posts</Link>
	            </div>

	            <div className="w3-container w3-light-green" style={{ width: '100%', marginLeft: '50px' }}>
  					<h1 style={{ marginLeft: '150px' }}>The Readable Application</h1>
				</div>
	        </div>
        );
    }
}

export default Home;