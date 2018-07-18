import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'typeface-roboto';

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
