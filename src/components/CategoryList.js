import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions';

class CategoryList extends Component {
    componentDidMount() {
        this.props.fetchCategories();
    }

    render() {
        const categories = this.props.categories;
        return (
            <div>
                <h1>Category List</h1>
                <div className="list-group">
                	{categories && categories.length > 0 && categories.map((cat) => {
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
function mapStateToProps({ categories }) {
    return {
        categories: categories.categories
    }
}

// Pass event handler from Action Creators
function mapDispatchToProps(dispatch) {
    return {
        fetchCategories: () => dispatch(fetchCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);