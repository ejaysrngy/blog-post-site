import React, { useReducer, memo } from "react";

import useContactStore from "@/store/contactStore";
import classes from "./contact-form.module.scss";

import { shallow } from "zustand/shallow";
import { reducer, initialState } from "./reducer";
import {
  Button,
  InputLabel,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

function ContactForm() {
  const { sendFeedback, closeNotif } = useContactStore(
    (state: any) => ({
      sendFeedback: state.sendFeedback,
      closeNotif: state.closeNotif,
    }),
    shallow
  );
  const notification = useContactStore((state: any) => state.notification);

  // form states
  const [state, dispatch] = useReducer(reducer, initialState);

  const { email, name, message } = state;

  const submitMessageHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const payload = {
      email: email,
      name: name,
      message: message,
    };

    sendFeedback(payload);
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

  return (
    <div className={classes.root}>
      <div className={classes.textContainer}>
        <Typography variant="h1">Let us know what you think!</Typography>
      </div>
      <div className={classes.formContainer}>
        <InputLabel htmlFor="form-name" className={classes.formLabel}>Name</InputLabel>
        <TextField
          required
          fullWidth
          value={name}
          id="form-name"
          onChange={handleNameInput}
        />
        <InputLabel htmlFor="form-email" className={classes.formLabel}>Email</InputLabel>
        <TextField
          fullWidth
          required
          value={email}
          id="form-email"
          onChange={handleEmailInput}
        />
        <InputLabel htmlFor="form-feedback" className={classes.formLabel}>Feedback/Suggestions</InputLabel>
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
        open={notification.status}
        autoHideDuration={5000}
        message={notification.text}
      />
    </div>
  );
}

export default memo(ContactForm);
