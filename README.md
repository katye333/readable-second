---
---
# **The Readable Application**
---
---
The Readable Application allows users to create content in several predefined categories, comment on theirs and other users' posts as well as
vote on posts and comments. In addition, users will also be able to edit and delete both posts and comments.
This project is part of the ReactJS nanodegree offered by Udacity.

This application was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## What You're Getting
```
+--public/
	+--fonts/
		+--css/
			|-- font-awesome.min.css
    |-- index.html
    |-- favicon.ico
    |-- manifest.json
    |-- windows_metro_colors.css
+--src/
	+--actions/
		|-- index.js
	+--components/
		|-- AddComment.js
		|-- AddPost.js
		|-- CategoryList.js
		|-- CommentList.js
		|-- Home.js
		|-- Post.js
		|-- PostList.js
		|-- UpdateComment.js
		|-- UpdatePost.js
	+--reducers/
		|-- index.js
	+--utils/
		|-- helpers.js
	|-- registerServiceWorker.js
    |-- index.css
    |-- index.js
|-- .gitignore
|-- README.MD
|-- package.json
|-- package-lock.json
```

### Features
---
  - The main page displays a listing of available categories and posts
  - When a category is selected, the user will be redirected to a page containing only those posts found in the chosen category
  - All posts, regardless of category may be viewed by selecting the "Posts" item on the sidebar
  - The details of a post (timestamp, category, comments, etc) along with the ability to edit, delete and add comments are given by clicking the "View Details" button on the post footer


### API Reference
---
##### `GET /categories`
* Returns all of the available categories.
* Found in `categories.js` (in the api-server/)

##### `GET /:category/posts`
* Get all of the posts for a particular category.

##### `GET /posts`
* Get all of the posts.

##### `POST /posts`
* params:
	** id [String]
	** timestamp [Timestamp]
	** title [String]
	** body [String]
	** author [String]
	** category [String]
* Add a new post

##### `GET /posts/:id`
* Get the details of a single post.

##### `POST /posts/:id`
* params: option [String]
* Used for voting on a post.

##### `PUT /posts/:id`
* params:
	** title [String]
	** body [String]
* Edit the details of an existing post.

##### `DELETE /posts/:id`
* Sets the deleted flag for a post to 'true'.
* Sets the parentDeleted flag for all child comments to 'true'.

##### `GET /posts/:id/comments`
* Get all the comments for a single post.

##### `POST /comments`
* params:
	** id [String]
	** timestamp [Timestamp]
	** body [String]
	** author [String]
	** parentId [String]
* Add a comment to a post.

##### `GET /comments/:id`
* Get the details for a single comment.

##### `POST /comments/:id`
* Used for voting on a comment.

##### `PUT /comments/:id`
* params:
	** timestamp [Timestamp]
	** body [String]
* Edit the details of an existing comment.

##### `DELETE /comments/:id`
* Sets a comment's deleted flag to true.


### Installation
---
Readable requires
* NPM v5+ (https://www.npmjs.com/)
* Readable API server (https://github.com/udacity/reactnd-project-readable-starter.git)

Install and start the API server
```sh
$ cd api-server
$ npm install
$ node server.js
```

Install and start Readable (in another terminal window)

```sh
$ cd readable-second
$ npm install
$ npm start
```

### License
---
MIT © [Kaitlin Stevens](https://github.com/katye333)