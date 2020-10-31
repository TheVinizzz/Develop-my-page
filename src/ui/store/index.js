/* eslint-disable import/prefer-default-export */
import {applyMiddleware, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers';
import {ENABLE_REDUX_LOGGER} from '../config';


const loggerMiddleware = createLogger();

export function configureStore(preloadedState = {}) {
  const middlewares = [thunkMiddleware];

  if (ENABLE_REDUX_LOGGER) {
    middlewares.push(loggerMiddleware);
  }

  const composeEnhancer = composeWithDevTools(
      {
        trace: true,
        traceLimit: 100 }
  );


  const store = createStore(rootReducer, preloadedState, composeEnhancer( applyMiddleware(...middlewares)));

  return store;
}
