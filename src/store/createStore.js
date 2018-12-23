/* global window */
import { applyMiddleware, compose, createStore as createReduxStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import api from '../middlewares/api';
import { USE_REDUX_LOG } from '../constants/config';
import baseReducer from '../reducers';
import EnvUtils from '../utils/env';
import { history } from '../utils/history';
import ExecEnvUtils from '../utils/execEnv';


const createStore = (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================

  const middleware = [
    thunk,
    routerMiddleware(history),
    api,
  ];
  // Redux logger
  if (USE_REDUX_LOG && EnvUtils.isDevelopment && ExecEnvUtils.canUseDOM) {
    middleware.push(createLogger({ collapsed: true }));
  }
  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];
  let composeEnhancers = compose;

  if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createReduxStore(
    connectRouter(history)(baseReducer),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers,
    ),
  );
  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const reducers = require('../reducers').default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};

export default createStore;
