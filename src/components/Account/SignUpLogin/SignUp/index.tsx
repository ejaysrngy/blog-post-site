import React from "react";

import classes from "./sign-up.module.scss";

import { Button, Typography, TextField, InputLabel } from "@mui/material";

function SignUp(props: {backBtnHandler : () => void}) {
  const {backBtnHandler} = props

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h6">Join in!</Typography>
      </div>
      <div className={classes.fields}>
        <div>
          <InputLabel htmlFor="username-email"> Username / Email </InputLabel>
          <TextField id="username-email" fullWidth size="small" />
        </div>
        <div>
          <InputLabel htmlFor="password"> Password </InputLabel>
          <TextField id="password" fullWidth size="small" />
        </div>
        <div>
          <InputLabel htmlFor="confirm-password"> Confirm Password </InputLabel>
          <TextField id="confirm-password" fullWidth size="small" />
        </div>
      </div>
      <div className={classes.btnContainer}>
        <Button variant="contained">Sign Up</Button>
      </div>
      <div className={classes.createAccountContainer}>
        <Typography>Have an account?</Typography>
        <Button variant="text" onClick={backBtnHandler}>Log in here!</Button>
      </div>
    </div>
  );
}

export default SignUp;
