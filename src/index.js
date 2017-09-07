import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App';
import reducer from './reducers'
import registerServiceWorker from './registerServiceWorker';

// Middleware
const logger = store => next => action => {
    // console.group(action.type);
    // console.info('Dispatching:', action);

    let result = next(action);
    // console.log('New state:', store.getState());
    // console.groupEnd(action.type);

    return result;
};

// Allow Middleware and Devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create Store with Middleware and Devtools
const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunkMiddleware)
    )
);

// Provider - Allow the subcomponents to be passed a store
// BrowserRouter - Allow multiple pages in application
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
