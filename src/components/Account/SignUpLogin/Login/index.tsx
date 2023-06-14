import React, { useState } from "react";

import * as yup from "yup";
import classes from "./login.module.scss";

import { LoginFieldTypes } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuthContext } from "@/components/common/AuthProvider/useAuthProvider";
import {
  Button,
  TextField,
  InputLabel,
  Typography,
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from "@mui/material";

const schema = yup.object({
  username: yup
    .string()
    .trim("Whitespaces are not allowed")
    .required("This field is required"),
  password: yup
    .string()
    .trim("Whitespaces are not allowed")
    .required("This field is required"),
});

type FormData = yup.InferType<typeof schema>;

function Login(props: { signUpBtnHandler: () => void }) {
  const { signUpBtnHandler } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginFieldTypes> = async (data) => {
    const {username, password} = data

    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

  };

  const handleChangeShowPassword = () => {
    setShowPassword(showPassword ? false : true);
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h6">Welcome back!</Typography>
      </div>
      <form className={classes.fields}>
        <div>
          <InputLabel htmlFor="username-email"> Username / Email </InputLabel>
          <TextField
            fullWidth
            size="small"
            id="username-email"
            error={!!errors.username}
            {...register("username")}
          />
          {!!errors.username && (
            <FormHelperText>{errors.username.message}</FormHelperText>
          )}
        </div>
        <div>
          <InputLabel htmlFor="password"> Password </InputLabel>
          <OutlinedInput
            fullWidth
            size="small"
            id="password"
            {...register("password")}
            error={!!errors.password}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={handleChangeShowPassword}
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {!!errors.password && (
            <FormHelperText>{errors.password.message}</FormHelperText>
          )}
        </div>
      </form>
      <div className={classes.btnContainer}>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Log in
        </Button>
      </div>
      <div className={classes.createAccountContainer}>
        <Typography>Don't have an account?</Typography>
        <Button variant="text" onClick={signUpBtnHandler}>
          Sign up here!
        </Button>
      </div>
    </div>
  );
}

export default Login;
