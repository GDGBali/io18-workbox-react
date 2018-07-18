import React from 'react';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const styles = {
  flex: {
    flex: 1
  }
};

const MainNav = ({ classes }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="title" color="inherit" className={classes.flex}>
        Restaurant Reviews
      </Typography>
      <Button color="inherit" component={NavLink} to="/">
        Home
      </Button>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(MainNav);
