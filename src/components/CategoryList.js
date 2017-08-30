import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CategoryAPI } from '../utils/api';
import { getCategories } from '../actions';
import PostList from './PostList';

class CategoryList extends Component {
	componentDidMount() {
        CategoryAPI.fetchCategories()
        	.then((categories) => {
            	this.props.getCategories(categories);
        	});
    }
	render() {
		const catNode = this.props.categories.map((cat) => {
			return (
                <Link
                    to={"/categories/"+cat.path}
                    className="list-group-item"
                    key={cat.path}>
                    {cat.name}
                </Link>
            )
		});
		return (
            <div>
                <h1>Category List</h1>
                <div className="list-group">
                    {catNode}
                </div>
            </div>
        );
	}
}

// Add State to the props of the MainPage component
function mapStateToProps({ categories, posts }) {
    return {
        categories: categories.categories
    }
}

// Pass event handler from Action Creators
function mapDispatchToProps(dispatch) {
    return {
        getCategories: (data) => dispatch(getCategories(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);