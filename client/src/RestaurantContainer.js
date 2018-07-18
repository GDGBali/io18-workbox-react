import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { requestDetails } from './store/actions';
import RestaurantDetail from './RestaurantDetail';

const styles = () => ({
  root: {
    padding: 24
  },
  reviews: {
    marginBottom: 30
  },
  icon: {
    color: 'gold'
  },
  img: {
    width: '100%'
  }
});

class RestaurantContainer extends Component {
  componentDidMount = () => {
    const {
      dispatch,
      match: {
        params: { restaurantId }
      }
    } = this.props;
    dispatch(requestDetails(restaurantId));
  };

  render() {
    const { classes, restaurantDetails } = this.props;

    return (
      <div>
        {restaurantDetails && (
          <RestaurantDetail
            classes={classes}
            restaurantDetails={restaurantDetails}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ restaurantDetails }) => ({
  restaurantDetails
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(RestaurantContainer);
