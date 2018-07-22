import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GridList from '@material-ui/core/GridList';

import { toggleFavourite } from './store/actions';

const styles = () => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
});

const onToggleFavourite = (dispatch, restaurantId, is_favorite) =>
  dispatch(toggleFavourite(restaurantId, !is_favorite));

const onImageClick = (id, history) => {
  history.push(`restaurants/${id}`);
};

const RestaurantCard = ({ restaurants, dispatch, classes, history }) => (
  <Grid item xs={12} sm={8}>
    <GridList cellHeight={180}>
      {restaurants.map(({ id, name, address, is_favorite }) => (
        <GridListTile key={id}>
          <img
            src={`/images/${id}.jpg`}
            alt=""
            onClick={() => onImageClick(id, history)}
            style={{ cursor: 'pointer' }}
          />
          <GridListTileBar
            title={name}
            subtitle={address}
            actionIcon={
              <IconButton
                color={is_favorite ? 'secondary' : 'inherit'}
                className={is_favorite ? '' : classes.icon}
                onClick={() => onToggleFavourite(dispatch, id, is_favorite)}
              >
                <FavoriteIcon />
              </IconButton>
            }
          />
        </GridListTile>
      ))}
    </GridList>
  </Grid>
);

export default compose(
  connect(null),
  withStyles(styles)
)(RestaurantCard);
