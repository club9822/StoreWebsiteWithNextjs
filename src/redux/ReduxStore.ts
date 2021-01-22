import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
//https://github.com/vercel/next.js/blob/canary/examples/with-redux-saga
import RootReducer from '@/redux/reducers/RootReducer';
import RootSaga from '@/redux/saga/RootSaga';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(RootReducer, bindMiddleware([sagaMiddleware]));
  store.sagaTask = sagaMiddleware.run(RootSaga);
  return store;
};

export const wrapper = createWrapper(makeStore, { debug: process.env.NODE_ENV !== 'production' });
