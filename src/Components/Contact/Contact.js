import React, { useRef, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import emailjs from "@emailjs/browser";

/**
 * A functional Contact US component that uses the EmailJS api to send me
 * emails.
 *
 */
const Contact = () => {
  /**
   * States
   */
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [open, setOpen] = useState(false);

  /**
   * Handles the form submission and EmailJS API call
   * @param {Event} e
   */

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SEVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          setOpen(true);
          setFormData({
            name: "",
            email: "",
            message: "",
          });
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );

    //
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box
        sx={{
          mt: "130px",
          mb: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            mx: "3%",
            p: 2,
            border: "2px navy solid",
            borderRadius: "10px",
          }}
        >
          <Typography variant="h6" align="center" mb={2}>
            Contact Us
          </Typography>
          <form onSubmit={handleSubmit} ref={form}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              type="email"
            />
            <TextField
              fullWidth
              label="Message"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              margin="normal"
              required
              multiline
              rows={4}
            />
            <Button variant="contained" type="submit" sx={{ my: 2 }}>
              Submit
            </Button>
          </form>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Message was sent successfully. Thank you
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Contact;
