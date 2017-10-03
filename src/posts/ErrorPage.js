import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorPage extends Component {
	render() {
		console.log('2')
		return (
			<div className="w3-container" style={{ marginLeft: '250px', marginTop: '20px', width: '50%', marginBottom: '100px' }}>
				<div class="w3-panel w3-red">
				    <h3>Error 404</h3>
				    <p>The page you were looking for is no longer available.</p>
				  </div>
			</div>
		)
	}
}

export default ErrorPage;