import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorPage extends Component {
	render() {
		return (
			<div className="w3-container post_container" style={{ marginTop: '20px', width: '60%', marginBottom: '100px' }}>
				<div className="w3-card-4">
					<div className="w3-container w3-red">
				    	<h3>Error 404</h3>
				    </div>

				    <div className="w3-container">
				    	<p>The page you were looking for is no longer available.</p>
				    </div>

				    <div className="w3-container w3-red">
				    	<Link to={'/'} className="w3-button">Home</Link>
				    </div>
				</div>
			</div>
		)
	}
}

export default ErrorPage;