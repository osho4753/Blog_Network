import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister , isAuth} from "../../redux/slices/auth";
import { Navigate } from 'react-router-dom'; 


export const Registration = () => {

  const dispatch = useDispatch();
  const Auth = useSelector(isAuth)
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const user = await dispatch(fetchRegister(data))
      if(!user.payload){
        alert('cant login')
      }else if('token' in user.payload){
        window.localStorage.setItem('token', user.payload.token)
      }
    };
   
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const minPasswordLength = 5;
    const minNameLength = 3;
  
    if(Auth){
      return <Navigate to="/"/>;
    }

  return (
    <Paper>
      <Typography classes="register_acc" variant="h5">
        Creating an Account
      </Typography>
      <div className="register_img">
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
<TextField 
      className="text_register" 
      label="Full Name"
      error={Boolean(errors.fullName)}
      helperText={errors.fullName?.message}
      type="text"
      {...register("fullName", {
      required: "Type your Full Name",
      minLength: {
        value: minNameLength,
        message: `Must be at least 3 characters long`,
      },
      })}
      fullWidth 
/>
<TextField
          className="login-text"
          label="E-Mail"
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          type="email"
          {...register("email", {
            required: "Type your email",
            pattern: {
              value: emailPattern,
              message: "Invalid email format",
            },
          })}
          fullWidth
/>
<TextField
          className="login-text"
          label="Password"
          fullWidth
          type="password"
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          {...register("password", {
            required: "Type your password",
            minLength: {
              value: minPasswordLength,
              message: `Password must be at least 5 characters long`,
            },
          })}
/>
        <Button type = 'submit' size="large" variant="contained" disabled={!isValid} fullWidth>
        Register
      </Button>
      </form>
    </Paper>
  );
};
