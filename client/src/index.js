import React from 'react';
import ReactDOM from 'react-dom';
import localforage from 'localforage';
import App from './App';
import 'typeface-roboto';

import './registerServiceWorker';

localforage.config({
  name: 'restaurant-reviews',
  storeName: 'restaurants'
});

const render = Component => {
  ReactDOM.render(<Component />, document.getElementById('root'));
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}
