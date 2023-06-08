import React from "react";

import classes from "./login.module.scss";

import {
  Button,
  Typography,
  TextField,
  InputLabel,
} from "@mui/material";

function Login(props: {signUpBtnHandler: () => void}) {
  const { signUpBtnHandler } = props

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h6">Welcome back!</Typography>
      </div>
      <div className={classes.fields}>
        <div>
          <InputLabel htmlFor="username-email"> Username / Email </InputLabel>
          <TextField id="username-email" fullWidth size="small"/>
        </div>
        <div>
          <InputLabel htmlFor="password"> Password </InputLabel>
          <TextField id="password" fullWidth size="small"/>
        </div>
      </div>
      <div className={classes.btnContainer}>
        <Button variant="contained">Log in</Button>
      </div>
      <div className={classes.createAccountContainer}>
        <Typography>Don't have an account?</Typography>
        <Button variant="text" onClick={signUpBtnHandler}>Sign up here!</Button>
      </div>
    </div>
  );
}

export default Login;
