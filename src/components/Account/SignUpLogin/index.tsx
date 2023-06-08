import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import classes from "./signup-login.module.scss";

import { Paper } from "@mui/material";

function SignUpLoginContainer() {
  const [isSignup, setIsSignup] = useState(false);

  const changeForm = () => {
    setIsSignup(isSignup ? false : true);
  };

  return (
    <Paper className={classes.root}>
      {isSignup ? (
        <SignUp backBtnHandler={changeForm} />
      ) : (
        <Login signUpBtnHandler={changeForm} />
      )}
    </Paper>
  );
}

export default SignUpLoginContainer;
