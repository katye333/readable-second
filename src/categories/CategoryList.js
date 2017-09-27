import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories } from './CategoryActions';

class CategoryList extends Component {
    componentDidMount() {
        this.props.fetchCategories();
    }

    render() {
        const categories = this.props.categories;
        return (
            <div className="w3-card-4 w3-content category_list_container">
	            <div className="w3-container w3-blue">
	            	<h1 className="w3-xxxlarge">Category List</h1>
	           	</div>
            	<ul className="w3-ul w3-hoverable">
                	{categories && categories.length > 0 && categories.map((cat) => {
                		return (
                			<li
                				key={cat.path}
                				className="w3-padding-large">
		                		<Link
		                			className="w3-large"
				                    to={"/categories/"+cat.path}>
				                    {cat.name}
				                </Link>
			                </li>
                		)
                	})}
	            </ul>
	            <div className="w3-container w3-card-2 w3-blue">
  					<h5>Select a category to see posts</h5>
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