import React, { useReducer, memo, useState } from "react";

import classes from "./contact-form.module.scss";

import { reducer, initialState } from "./reducer";
import {
  Button,
  InputLabel,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

function ContactForm() {
  // form states
  const [state, dispatch] = useReducer(reducer, initialState);

  // notif state
  const [formNotif, setFormNotif] = useState({
    text: "",
    status: false,
  });

  const { email, name, message } = state;

  const submitMessageHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const response = await fetch("/api/contact/send-message", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        name: name,
        message: message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      setFormNotif({
        text: "Failed to send. Please try again",
        status: true,
      });
    } else {
      setFormNotif({
        text: "Thank you for your feedback!",
        status: true,
      });
    }
  };

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_NAME", payload: { name: event.target.value } });
  };

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_EMAIL", payload: { email: event.target.value } });
  };

  const handleMessageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_MESSAGE",
      payload: { message: event.target.value },
    });
  };

  const closeNotif = () => {
    setFormNotif({
      text: "",
      status: false,
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.textContainer}>
        <Typography variant="h1">Let us know what you think!</Typography>
      </div>
      <div className={classes.formContainer}>
        <InputLabel htmlFor="form-name">Name</InputLabel>
        <TextField
          required
          fullWidth
          value={name}
          id="form-name"
          onChange={handleNameInput}
        />
        <InputLabel htmlFor="form-email">Email</InputLabel>
        <TextField
          fullWidth
          required
          value={email}
          id="form-email"
          onChange={handleEmailInput}
        />
        <InputLabel htmlFor="form-feedback">Feedback/Suggestions</InputLabel>
        <TextField
          required
          fullWidth
          multiline
          rows={4}
          value={message}
          id="form-feedback"
          onChange={handleMessageInput}
        />
        <div className={classes.buttonContainer}>
          <Button
            variant="outlined"
            onClick={submitMessageHandler}
            disabled={!email || !name || !message}
          >
            {" "}
            Submit{" "}
          </Button>
        </div>
      </div>

      <Snackbar
        onClose={closeNotif}
        open={formNotif.status}
        autoHideDuration={5000}
        message={formNotif.text}
      />
    </div>
  );
}

export default memo(ContactForm);
