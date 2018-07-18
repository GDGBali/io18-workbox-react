import { createSelector } from 'reselect';

const initialState = {
  restaurants: [],
  restaurantDetails: null,
  cuisineFilter: 'All',
  isFetching: false,
  snackbar: {
    open: false,
    titleText: '',
    buttonText: 'Dismiss',
    autoHideDuration: 3000,
    customClose: false
  }
};

const restaurantsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'REQUEST_RESTAURANTS':
      return {
        ...state,
        isFetching: true
      };
    case 'RECEIVE_RESTAURANTS':
      return {
        ...state,
        isFetching: false,
        restaurants: payload.restaurants
      };
    case 'CHANGE_FILTER':
      return {
        ...state,
        cuisineFilter: payload.cuisineFilter
      };
    case 'TOGGLE_SNACKBAR':
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          ...payload.snackbar,
          open: !state.snackbar.open
        }
      };
    case 'TOGGLE_FAVOURITE':
      return {
        ...state,
        restaurants: state.restaurants.map(
          restaurant =>
            payload.restaurantId !== restaurant.id
              ? restaurant
              : { ...restaurant, is_favorite: !restaurant.is_favorite }
        )
      };
    case 'RECEIVE_RESTAURANT_DETAILS':
      return {
        ...state,
        restaurantDetails: payload.restaurantDetails
      };
    case 'POST_REVIEW':
      return {
        ...state,
        restaurantDetails: {
          ...state.restaurantDetails,
          reviews: [...state.restaurantDetails.reviews, payload.review]
        }
      };
    default:
      return state;
  }
};

const getRestaurants = state => state.restaurants;
const getCuisine = state => state.cuisineFilter;

export const favoriteRestaurants = createSelector(
  [getRestaurants],
  restaurants => restaurants.filter(restaurant => restaurant.is_favorite)
);

export const filterByCuisine = createSelector(
  getRestaurants,
  getCuisine,
  (restaurants, cuisine) => {
    const filteredRestaurants =
      cuisine === 'All'
        ? restaurants
        : restaurants.filter(restaurant => restaurant.cuisine_type === cuisine);
    return filteredRestaurants;
  }
);

export default restaurantsReducer;
