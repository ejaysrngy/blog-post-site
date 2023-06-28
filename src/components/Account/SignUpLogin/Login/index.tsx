import React from "react";

import * as yup from "yup";
import useUiStore from "@/store/uiStore";
import classes from "./login.module.scss";

import { LoginFieldTypes } from "./types";
import { Button, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { CustomTextField, CustomPasswordInput } from "@/components/common";
import { useAuthContext } from "@/hooks/AuthProvider/useAuthProvider";

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

function Login(props: { signUpBtnHandler?: () => void }) {
  const { signUpBtnHandler } = props;
  const { login } = useAuthContext();
  const openNotif = useUiStore((state: any) => state.openNotif);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const isNotSignUp = !!signUpBtnHandler;

  const onSubmit: SubmitHandler<LoginFieldTypes> = async (data) => {
    const { username, password } = data;

    const response = await login(username, password);

    if (response?.status) {
      openNotif({ status: true, text: response.message });
    } else {
      openNotif({ status: true, text: response?.message });
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        {isNotSignUp && <Typography variant="h6">Welcome back!</Typography>}
      </div>
      <form className={classes.fields}>
        <div>
          <CustomTextField
            size="small"
            errors={errors}
            inputId="username-email"
            reactFormName="username"
            fieldName="Username / Email"
            reactFormRegister={{ ...register("username") }}
          />
        </div>
        <div>
          <CustomPasswordInput
            size="small"
            errors={errors}
            inputId="password"
            reactFormName="password"
            fieldName="Password"
            reactFormRegister={{ ...register("password") }}
          />
        </div>
      </form>
      <div className={classes.btnContainer}>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Log in
        </Button>
      </div>
      {isNotSignUp && (
        <div className={classes.createAccountContainer}>
          <Typography>{"Don't have an account?"}</Typography>
          <Button variant="text" onClick={signUpBtnHandler}>
            Sign up here!
          </Button>
        </div>
      )}
    </div>
  );
}

export default Login;
