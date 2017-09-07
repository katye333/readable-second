// Server address
const url = 'http://localhost:5001';

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

// Headers for Ajax request
const headers = {
    'Accept': 'application/json',
    'Authorization': token
};



// All the methods pertaining to the Posts API
export const PostAPI = {
	fetchPosts: () => (
		fetch(`${url}/posts`, { method: 'GET', headers })
	        .then((res) => res.json())
	        .catch((exception) => {
	            console.log('Error', exception)
	        })
	),

	fetchPostsByCategory: (category) => (
		fetch(`${url}/${category}/posts`, { method: 'GET', headers })
			.then((res) => res.json())
			.catch((exception) => {
	            console.log('Error', exception)
	        })
	),

	getPostById: (postId) => (
	    fetch(`${url}/posts/${postId}`, { method: 'GET', headers })
	      	.then(res => res.json())
	      	.catch((exception) => {
				console.log('Error', exception)
			})
  	),

  	createNewPost: (post) => (
  		fetch(`${url}/posts`, {
  			method: 'POST',
  			headers: {
  				'Accept': 'application/json',
  				'Authorization': token,
  				'Content-Type': 'application/json'
  			},
  			body: JSON.stringify(post) })
  			.then((res) => res.json())
  	),

  	editPost: (post) => (
  		console.log(post),
  		fetch(`${url}/posts/${post.id}`, {
  			method: 'PUT',
  			headers: {
  				'Accept': 'application/json',
  				'Authorization': token,
  				'Content-Type': 'application/json'
  			},
  			body: JSON.stringify(post) })
  			.then((res) => res.json())
  	),

  	deletePost: (postId) => (
	    fetch(`${url}/posts/${postId}`, {
	    	method: 'DELETE',
  			headers: {
  				'Accept': 'application/json',
  				'Authorization': token,
  				'Content-Type': 'application/json'
  			},
	    })
      	.then(res => res.text())
      	.catch((exception) => {
			console.log('Error', exception)
		})
  	),
}

