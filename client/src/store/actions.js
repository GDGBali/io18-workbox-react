import shuffle from 'lodash/shuffle';
import localforage from 'localforage';

const BASE_URL = 'http://localhost:1337';

const dispatchReceive = (dispatch, restaurants) =>
  dispatch({
    type: 'RECEIVE_RESTAURANTS',
    payload: {
      restaurants: shuffle(
        restaurants.map(restaurant => ({
          ...restaurant,
          is_favorite: restaurant.is_favorite === 'true'
        }))
      )
    }
  });

export const requestRestaurant = () => dispatch => {
  dispatch({
    type: 'REQUEST_RESTAURANTS'
  });

  return fetch(`${BASE_URL}/restaurants`)
    .then(response => response.json())
    .then(restaurantsJson => {
      const getItems = restaurantsJson.map(restaurant =>
        localforage.setItem(
          `restaurants-${restaurant.id.toString()}`,
          restaurant
        )
      );
      return Promise.all(getItems).then(restaurants =>
        dispatchReceive(dispatch, restaurants)
      );
    })
    .catch(() => {
      localforage
        .startsWith('restaurants-')
        .then(restaurants =>
          dispatchReceive(dispatch, Object.values(restaurants))
        );
    });
};

export const requestDetails = restaurantId => dispatch => {
  const promises = [];
  promises.push(
    fetch(`${BASE_URL}/restaurants/${restaurantId}`)
      .then(response => response.json())
      .catch(() =>
        localforage.getItem(`restaurants-${restaurantId.toString()}`)
      )
  );
  promises.push(
    fetch(`${BASE_URL}/reviews/?restaurant_id=${restaurantId}`)
      .then(response => response.json())
      .then(reviews => {
        reviews.map(review =>
          localforage.setItem(`reviews-${review.id}`, review)
        );
        return reviews;
      })
      .catch(() =>
        localforage.startsWith('reviews-').then(results =>
          Object.values(results).filter(
            // eslint-disable-next-line
            result => result.restaurant_id == restaurantId
          )
        )
      )
  );
  Promise.all(promises).then(([restaurantDetail, reviews]) => {
    dispatch({
      type: 'RECEIVE_RESTAURANT_DETAILS',
      payload: {
        restaurantDetails: {
          ...restaurantDetail,
          reviews
        }
      }
    });
  });
};

export const changeFilter = cuisineFilter => dispatch =>
  dispatch({ type: 'CHANGE_FILTER', payload: { cuisineFilter } });

export const toggleSnackbar = snackbar => dispatch => {
  dispatch({ type: 'TOGGLE_SNACKBAR', payload: { snackbar } });
};

export const toggleFavourite = (
  restaurantId,
  is_favorite
) => async dispatch => {
  const titleText = is_favorite
    ? 'Added to favourite'
    : 'Removed from favourite';
  await fetch(
    `${BASE_URL}/restaurants/${restaurantId}/?is_favorite=${is_favorite}`,
    {
      method: 'PUT'
    }
  );
  dispatch(toggleSnackbar({ titleText }));
  dispatch({ type: 'TOGGLE_FAVOURITE', payload: { restaurantId } });
};

export const postReview = payload => async dispatch => {
  const review = { ...payload };
  await fetch(`${BASE_URL}/reviews`, {
    method: 'POST',
    body: JSON.stringify(review)
  });
  dispatch({ type: 'POST_REVIEW', payload: { review } });
  dispatch(toggleSnackbar({ titleText: 'Review Added' }));
};
