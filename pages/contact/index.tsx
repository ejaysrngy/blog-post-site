import React from "react";
import classes from "./contact-page.module.scss";

import { Typography } from "@mui/material";
import { ContactForm } from "@/components";

export default function Contact() {
  return (
    <div className={classes.root}>
      <Typography variant="h4">Contact Us </Typography>
      <ContactForm />
    </div>
  );
}
