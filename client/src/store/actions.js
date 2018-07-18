import shuffle from 'lodash/shuffle';

const BASE_URL = 'http://localhost:1337';

export const requestRestaurant = () => dispatch => {
  dispatch({
    type: 'REQUEST_RESTAURANTS'
  });

  return fetch(`${BASE_URL}/restaurants`)
    .then(response => response.json())
    .then(restaurants =>
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
      })
    );
};

export const requestDetails = restaurantId => dispatch => {
  const promises = [];
  promises.push(
    fetch(`${BASE_URL}/restaurants/${restaurantId}`).then(response =>
      response.json()
    )
  );
  promises.push(
    fetch(`${BASE_URL}/reviews/?restaurant_id=${restaurantId}`).then(response =>
      response.json()
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

export const toggleFavourite = (restaurantId, is_favorite) => dispatch =>
  fetch(`${BASE_URL}/restaurants/${restaurantId}/?is_favorite=${is_favorite}`, {
    method: 'PUT'
  }).then(() => {
    const titleText = is_favorite
      ? 'Added to favourite'
      : 'Removed from favourite';
    dispatch(toggleSnackbar({ titleText }));
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: { restaurantId } });
  });

export const postReview = payload => dispatch => {
  fetch(`${BASE_URL}/reviews`, {
    method: 'POST',
    body: JSON.stringify({ ...payload })
  })
    .then(response => response.json())
    .then(review => {
      dispatch(toggleSnackbar({ titleText: 'Review Added' }));
      dispatch({ type: 'POST_REVIEW', payload: { review } });
    });
};
