import React from "react";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import "../css/index.css"; 

export const Index = () => {
  return (
    <div className="write-comment">
      <Avatar className="avatar-container" src="https://mui.com/static/images/avatar/5.jpg" />
      <div className="text-container">
        <TextField
          label="Write Comment"
          variant="outlined"
          maxRows={10}
          multiline
          fullWidth
          className="text-field"
        />
        <Button variant="contained" className="send-button">Send</Button>
      </div>
    </div>
  );
};