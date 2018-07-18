import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import StarIcon from '@material-ui/icons/Star';
import AddReview from './AddReview';

const renderRatings = (rating, classes) => {
  const ratings = [];
  for (let i = 0; i < rating; i += 1) {
    ratings.push(rating);
  }
  return ratings.map((rate, idx) => (
    <StarIcon className={classes.icon} key={`rate-${idx}`} />
  ));
};

const RestaurantDetail = ({ classes, restaurantDetails }) => (
  <Grid
    container
    className={classes.root}
    justify="space-between"
    spacing={24}
    alignItems="center"
  >
    <Grid item xs={12} sm={4}>
      <div className={classes.centerImg}>
        <img
          src={`/images/${restaurantDetails.id}.jpg`}
          alt=""
          className={classes.img}
        />
      </div>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Typography variant="display2" gutterBottom>
        {restaurantDetails.name}
      </Typography>
      <Typography variant="title" gutterBottom>
        {restaurantDetails.cuisine_type}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {restaurantDetails.address}
      </Typography>
      <Table style={{ width: 'auto', tableLayout: 'auto' }}>
        <TableBody>
          {Object.entries(restaurantDetails.operating_hours).map(hour => (
            <TableRow key={hour[0]}>
              <TableCell>{hour[0]}</TableCell>
              <TableCell numeric>{hour[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Typography variant="headline" gutterBottom>
        Reviews
      </Typography>
      {restaurantDetails.reviews.map(review => (
        <div key={review.id} className={classes.reviews}>
          <Typography variant="subheading">{review.name}</Typography>
          {renderRatings(review.rating, classes)}
          <Typography variant="caption" gutterBottom>
            {review.comments}
          </Typography>
        </div>
      ))}
      <AddReview restaurantId={restaurantDetails.id} />
    </Grid>
  </Grid>
);

export default RestaurantDetail;
