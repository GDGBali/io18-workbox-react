import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import restaurants from './reducers';

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  restaurants,
  compose(
    applyMiddleware(thunkMiddleware),
    reduxDevTools
  )
);

export default store;
