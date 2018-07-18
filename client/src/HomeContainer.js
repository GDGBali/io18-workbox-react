import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AppBar from '@material-ui/core/AppBar';
import { requestRestaurant, changeFilter } from './store/actions';
import { favoriteRestaurants, filterByCuisine } from './store/reducers';
import RestaurantCard from './RestaurantCard';

const styles = () => ({
  root: {
    padding: 24
  },
  tabs: {
    marginTop: 30
  },
  gridList: {
    width: 500,
    height: 450
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
});

class HomeContainer extends Component {
  state = {
    tabValue: 0
  };

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(requestRestaurant());
  };

  handleChange = (event, tabValue) => {
    this.setState({ tabValue });
  };

  renderRestaurants = () => {
    const { tabValue } = this.state;
    const { filteredRestaurants, favorites } = this.props;
    const restaurants = tabValue === 0 ? filteredRestaurants : favorites;

    return <RestaurantCard restaurants={restaurants} />;
  };

  render() {
    const { classes, dispatch, isFetching, cuisineFilter } = this.props;
    const { tabValue } = this.state;
    const cuisines = ['All', 'Asian', 'American', 'Pizza', 'Mexican'];

    return (
      <div>
        <Grid container className={classes.tabs}>
          <Grid item xs={12}>
            <AppBar position="static">
              <Tabs
                value={tabValue}
                onChange={this.handleChange}
                fullWidth
                centered
              >
                <Tab label="All Restaurants" />
                <Tab label="Favourites" />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
        {tabValue === 0 && (
          <Grid
            container
            spacing={24}
            justify="center"
            className={classes.root}
          >
            {cuisines.map(cuisine => (
              <Grid item key={cuisine}>
                <Button
                  variant="contained"
                  color={cuisine === cuisineFilter ? 'secondary' : 'default'}
                  onClick={() => dispatch(changeFilter(cuisine))}
                >
                  {cuisine}
                </Button>
              </Grid>
            ))}
          </Grid>
        )}
        <Grid container spacing={16} className={classes.root} justify="center">
          {isFetching && 'Loading...'}
          {!isFetching && this.renderRestaurants(classes)}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { cuisineFilter, isFetching } = state;
  return {
    cuisineFilter,
    isFetching,
    favorites: favoriteRestaurants(state),
    filteredRestaurants: filterByCuisine(state)
  };
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(HomeContainer);
