import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import StarIcon from '@material-ui/icons/Star';
import StarRatingComponent from 'react-star-rating-component';

import { postReview } from './store/actions';

class AddReview extends Component {
  state = {
    addReview: false,
    name: '',
    rating: 1,
    comments: ''
  };

  onStarClick = nextValue => {
    this.setState({ rating: nextValue });
  };

  onHandleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  onHandleNewReview = () => {
    this.setState({ addReview: true });
  };

  onSubmitReview = () => {
    const { dispatch, restaurantId } = this.props;
    const { name, rating, comments } = this.state;
    this.setState({ addReview: false });
    const newReview = { name, rating, comments, restaurant_id: restaurantId };
    dispatch(postReview(newReview));
  };

  render() {
    const { addReview, name, comments, rating } = this.state;
    return (
      <div>
        {!addReview && (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onHandleNewReview}
            >
              Add Review
            </Button>
          </div>
        )}
        {addReview && (
          <Grid container>
            <Grid item xs={12}>
              <form noValidate autoComplete="off">
                <TextField
                  id="name"
                  label="Name"
                  value={name}
                  onChange={this.onHandleChange('name')}
                  margin="normal"
                  required
                  fullWidth
                  autoComplete="name"
                />
                <StarRatingComponent
                  name="app3"
                  starCount={5}
                  value={rating}
                  onStarClick={this.onStarClick}
                  starColor="gold"
                  renderStarIcon={() => <StarIcon />}
                />
                <TextField
                  id="comments"
                  label="Comments"
                  multiline
                  rows="4"
                  rowsMax="4"
                  value={comments}
                  onChange={this.onHandleChange('comments')}
                  margin="normal"
                  fullWidth
                  autoComplete="comments"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.onSubmitReview}
                >
                  Submit
                </Button>
              </form>
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

export default connect(null)(AddReview);
