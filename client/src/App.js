import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import CssBaseline from '@material-ui/core/CssBaseline';
import store from './store';
import MainNav from './MainNav';
import BaseSnackbar from './BaseSnackbar';

const HomeContainer = Loadable({
  loader: () => import('./HomeContainer'),
  loading() {
    return <div>Loading...</div>;
  }
});

const RestaurantContainer = Loadable({
  loader: () => import('./RestaurantContainer'),
  loading() {
    return <div>Loading...</div>;
  }
});

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <MainNav />
          <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route
              exact
              path="/restaurants/:restaurantId"
              component={RestaurantContainer}
            />
          </Switch>
          <BaseSnackbar />
        </React.Fragment>
      </Router>
    </Provider>
  </React.Fragment>
);

export default App;
