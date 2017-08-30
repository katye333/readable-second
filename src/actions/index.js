// Constants for type property
export const CATEGORY_FETCH = 'CATEGORY_FETCH';
export const POST_FETCH = 'POST_FETCH';
export const POST_ADD = 'POST_ADD';
export const POST_EDIT = 'POST_EDIT';
export const POST_DELETE = 'POST_DELETE';
export const COMMENT_FETCH = 'COMMENT_FETCH';
export const COMMENT_ADD = 'COMMENT_ADD';
export const COMMENT_EDIT = 'COMMENT_EDIT';
export const COMMENT_DELETE = 'COMMENT_DELETE';

/* ----------------------------------------- */
/* ************ ACTION CREATORS ************ */
/* ----------------------------------------- */

// Category Actions
export function getCategories(categories) {
    return {
        type: CATEGORY_FETCH,
        categories
    };
}

// Post Actions
export function getPosts(posts) {
	return {
		type: POST_FETCH,
		posts
	};
}

export function addPost(post) {
	return {
		type: POST_ADD,
		post
	};
}

export function editPost(post) {
	return {
		type: POST_ADD,
		post
	};
}

export function deletePost(post) {
	return {
		type: POST_ADD,
		post
	};
}

// Comment Actions
export function getComments(comments) {
	return {
		type: COMMENT_FETCH,
		comments
	};
}

export function addComment(comment) {
	return {
		type: COMMENT_ADD,
		comment
	};
}

export function editComment(comment) {
	return {
		type: COMMENT_ADD,
		comment
	};
}

export function deleteComment(comment) {
	return {
		type: COMMENT_ADD,
		comment
	};
}