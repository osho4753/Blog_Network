import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';


export const Registration = () => {
  return (
    <Paper>
      <Typography classes="register_acc" variant="h5">
        Creating an Account
      </Typography>
      <div className="register_img">
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <TextField className="text_register" label="Full Name" fullWidth />
      <TextField className="text_register" label="E-Mail" fullWidth />
      <TextField className="text_register" label="Password" fullWidth />
      <Button size="large" variant="contained" fullWidth>
        Register
      </Button>
    </Paper>
  );
};
