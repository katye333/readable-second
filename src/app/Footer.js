import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
        	<div>
	            <footer className="w3-container w3-light-green"
					style={{
						marginTop: '20px',
						marginRight: '-20px',
						padding: '1rem'
					}}>
  					<h6 style={{ marginLeft: '200px' }}>The Readable Application</h6>
				</footer>
	        </div>
        );
    }
}

export default Footer;