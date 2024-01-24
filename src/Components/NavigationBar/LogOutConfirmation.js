import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import React from "react";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

/**
 *
 * A dialog for confirming the user successful og out
 *
 * @param {Boolean,function} param0
 *
 */
const LogOutConfirmation = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Confirm Logout!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Thank you for being an Electronics Haven's customer.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(true)}>Ok</Button>
        <Button onClick={()=> handleClose(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogOutConfirmation;
