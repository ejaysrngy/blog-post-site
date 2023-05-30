import React from "react";
import { Typography } from "@mui/material";

import { HeaderComponentTypes } from "./types";

export default function HeaderComponent(props: HeaderComponentTypes) {
  const { text, style, variant } = props;
  return (
    <Typography variant={variant} style={{ ...style }}>
      {" "}
      {text}{" "}
    </Typography>
  );
}
