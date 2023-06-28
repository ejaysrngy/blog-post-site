import React from "react";

import classes from './custom-textfield.module.scss'
import { CustomTextFieldPropTypes } from "./types";
import { TextField, InputLabel, FormHelperText } from "@mui/material";

function CustomTextField(props: CustomTextFieldPropTypes) {
  const {
    fieldName,
    inputId,
    size,
    errors,
    disabled,
    reactFormRegister,
    reactFormName,
  } = props;

  return (
    <div className={classes.root}>
      <InputLabel
        htmlFor={inputId}
        style={{ color: disabled ? "#999999" : "#000000" }}
      >
        {" "}
        {fieldName}{" "}
      </InputLabel>
      <TextField
        fullWidth
        size={size}
        id={inputId}
        disabled={disabled}
        error={!!errors[reactFormName]}
        {...reactFormRegister}
      />
      {!!errors[reactFormName] && (
        <FormHelperText>{errors[reactFormName].message}</FormHelperText>
      )}
    </div>
  );
}

export default CustomTextField;
