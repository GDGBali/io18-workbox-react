import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { toggleSnackbar } from './store/actions';

class BaseSnackbar extends React.Component {
  handleClose = (_, reason) => {
    const { dispatch } = this.props;
    if (reason === 'clickaway') {
      return;
    }
    dispatch(toggleSnackbar());
  };

  render() {
    const {
      open,
      titleText,
      buttonText,
      autoHideDuration,
      customClose
    } = this.props;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={this.handleClose}
        message={<span>{titleText}</span>}
        action={[
          <Button
            key="undo"
            color="secondary"
            size="small"
            onClick={customClose ? null : this.handleClose}
          >
            {buttonText}
          </Button>
        ]}
      />
    );
  }
}

const mapStateToProps = ({ snackbar }) => ({
  ...snackbar
});

export default compose(connect(mapStateToProps))(BaseSnackbar);
