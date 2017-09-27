import { combineReducers } from 'redux';
import categories from '../categories/CategoryReducer';
import posts from '../posts/PostReducer';
import comments from '../comments/CommentReducer';

export default combineReducers({
	categories,
    posts,
    comments
});