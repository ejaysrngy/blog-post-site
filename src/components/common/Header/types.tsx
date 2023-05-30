import React from "react";
import { TypographyTypeMap } from "@mui/material";

export interface HeaderComponentTypes {
  text: string;
  variant?: TypographyTypeMap["props"]["variant"]
  style?: React.CSSProperties;
}
