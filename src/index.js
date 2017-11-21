import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import allReducers from './reducers/root';
// import { fetchImages } from './actions/imgur';
import { fetchStarwars } from './actions/starwars';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(allReducers, applyMiddleware(thunk));

store.dispatch(fetchStarwars("starships/"));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root')
);

registerServiceWorker();
