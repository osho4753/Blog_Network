import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export const SideBlock = ({ title, children }) => {
  return (
    <Paper classes="sides">
      <Typography variant="h6" classes="sides-head">
        {title}
      </Typography>
      {children}
    </Paper>
  );
};
