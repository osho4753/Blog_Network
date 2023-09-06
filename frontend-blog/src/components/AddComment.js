import React from "react";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export const Index = () => {
  return (
    <>
      <div className="write-comment">
        <Avatar
          classes="avatar-container"
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className="text-container">
          <TextField
            label="Write Comment"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button variant="contained">Send</Button>
        </div>
      </div>
    </>
  );
};
