import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './app/App';
import reducer from './app/reducers'
import registerServiceWorker from './registerServiceWorker';
import { createLogger } from 'redux-logger';

const logger = createLogger({
	// ...options
});

// Allow Middleware and Devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create Store with Middleware and Devtools
const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunkMiddleware, logger)
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
