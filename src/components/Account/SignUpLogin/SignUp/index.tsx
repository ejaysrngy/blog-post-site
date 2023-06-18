import React, { useState } from "react";

import * as yup from "yup";
import classes from "./sign-up.module.scss";

import { SignUpTypes } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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
    .required("This field is required")
    .min(8, "Password should at least be 8 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("This field is required"),
});

type FormData = yup.InferType<typeof schema>;

function SignUp(props: { backBtnHandler: () => void }) {
  const { backBtnHandler } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit: SubmitHandler<SignUpTypes> = async (data) => {
    const { username, password } = data;

    await fetch("/api/user/register", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleShowPassword = () => {
    setShowPassword(showPassword ? false : true);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(showConfirmPassword ? false : true);
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h6">Join in!</Typography>
      </div>
      <div className={classes.fields}>
        <div>
          <InputLabel htmlFor="username-email"> Username / Email </InputLabel>
          <TextField
            fullWidth
            size="small"
            id="username-email"
            {...register("username")}
            error={!!errors.username}
          />
          {!!errors.username && (
            <FormHelperText>{errors?.username.message}</FormHelperText>
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
                  onClick={handleShowPassword}
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
        <div>
          <InputLabel htmlFor="confirm-password"> Confirm Password </InputLabel>
          <OutlinedInput
            fullWidth
            size="small"
            id="confirm-password"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            type={showConfirmPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={handleShowConfirmPassword}
                  aria-label="toggle password visibility"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {!!errors.confirmPassword && (
            <FormHelperText>{errors.confirmPassword.message}</FormHelperText>
          )}
        </div>
      </div>
      <div className={classes.btnContainer}>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Sign Up
        </Button>
      </div>
      <div className={classes.createAccountContainer}>
        <Typography>Have an account?</Typography>
        <Button variant="text" onClick={backBtnHandler}>
          Log in here!
        </Button>
      </div>
    </div>
  );
}

export default SignUp;
