import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CategoryAPI } from '../utils/api';
import { getCategoriesAll } from '../actions';
import PostList from './PostList';

class CategoryList extends Component {

	componentDidMount() {
		const { dispatch, categories } = this.props
        dispatch(getCategoriesAll(categories));
    }

	render() {
		const { categories, categoryIsFetching } = this.props
		return (
            <div>
                <h1>Category List</h1>
                <div className="list-group">
                	{categories.categories && categories.categories.length > 0 && categories.categories.map((cat) => {
                		return (
	                		<Link
			                    to={"/categories/"+cat.path}
			                    className="list-group-item"
			                    key={cat.path}>
			                    {cat.name}
			                </Link>
                		)
                	})}
                </div>
            </div>
        )
	};
}

// Add State to the props of the MainPage component
function mapStateToProps(state) {
	const { categories, categoryIsFetching } = state
    return {
        categories,
        categoryIsFetching
    }
}

export default connect(mapStateToProps)(CategoryList);