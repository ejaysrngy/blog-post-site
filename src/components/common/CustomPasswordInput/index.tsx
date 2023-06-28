import React, { useState } from "react";

import { CustomPasswordInputPropTypes } from "./types";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  OutlinedInput,
  InputLabel,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material";

function CustomPasswordInput(props: CustomPasswordInputPropTypes) {
  const { fieldName, inputId, size, errors, reactFormRegister, reactFormName } =
    props;

  const [showPassword, setShowPassword] = useState(false);

  const handleChangeShowPassword = () => {
    setShowPassword(showPassword ? false : true);
  };

  return (
    <>
      <InputLabel htmlFor={inputId}> {fieldName} </InputLabel>
      <OutlinedInput
        fullWidth
        size={size}
        id={inputId}
        {...reactFormRegister}
        error={!!errors[reactFormName]}
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
      {!!errors[reactFormName] && (
        <FormHelperText>{errors[reactFormName].message}</FormHelperText>
      )}
    </>
  );
}

export default CustomPasswordInput;
