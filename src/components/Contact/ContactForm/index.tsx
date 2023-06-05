import React from "react";
import classes from "./contact-form.module.scss";

import { Button, InputLabel, TextField, Typography } from "@mui/material";

function ContactForm() {
  return (
    <div className={classes.root}>
      <div className={classes.textContainer}>
        <Typography variant="h1">Let us know what you think!</Typography>
      </div>
      <div className={classes.formContainer}>
        <InputLabel htmlFor="form-name">Name</InputLabel>
        <TextField id="form-name" fullWidth />
        <InputLabel htmlFor="form-email">Email</InputLabel>
        <TextField id="form-email" fullWidth />
        <InputLabel htmlFor="form-feedback">Feedback/Suggestions</InputLabel>
        <TextField id="form-feedback" fullWidth multiline rows={4} />
        <div className={classes.buttonContainer}>
            <Button variant="outlined"> Submit </Button>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
