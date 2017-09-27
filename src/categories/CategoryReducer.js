import {
    CATEGORY_REQUEST,
    CATEGORY_RECEIVE
} from '../app/types';

function categories(state = { fetchingCategories: false, categories: [] }, action) {
    switch (action.type) {
        case CATEGORY_REQUEST:
            return Object.assign({}, state, {
                fetchingCategories: true,
                categories: []
            });

        case CATEGORY_RECEIVE:
            return Object.assign({}, state, {
                fetchingCategories: false,
                categories: action.categories
            });

        default:
            return state;
    }
}

export default categories;