import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export const Login = () => {
  return (
    <Paper classes="login">
      <Typography classes="login-text" variant="h5">
        Login to your account
      </Typography>
      <TextField
        className="login-text"
        label="E-Mail"
        error
        helperText="Invalid email address"
        fullWidth
      />
      <TextField className="login-text" label="Password" fullWidth />
      <Button size="large" variant="contained" fullWidth>
        Login
      </Button>
    </Paper>
  );
};