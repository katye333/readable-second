import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
        	<div className="">
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

	            <div className="w3-container w3-light-green">
  					<h1 style={{ marginLeft: '200px' }}>The Readable Application</h1>
				</div>

				<footer className="w3-container w3-light-green"
					style={{
						position: 'absolute',
						right: '0',
						bottom: '0',
						left: '0',
						padding: '1rem'
					}}>
  					<h6 style={{ marginLeft: '200px' }}>The Readable Application</h6>
				</footer>
	        </div>
        );
    }
}

export default Home;