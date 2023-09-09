import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin , isAuth} from "../../redux/slices/auth";
import { Navigate } from 'react-router-dom'; 

export const Login = () => {
  const dispatch = useDispatch();
  const Auth = useSelector(isAuth)
  console.log(Auth,'auth');
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
  const user = await dispatch(fetchLogin(data))
    if(!user.payload){
      alert('cant login')
    }else if('token' in user.payload){
      window.localStorage.setItem('token', user.payload.token)
    }
  };
 
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const minPasswordLength = 5;

  if(Auth){
    return <Navigate to="/"/>;
  }

  return (
    <Paper className="login">
      <Typography className="login-text" variant="h5">
        Login to your account
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Login
        </Button>
      </form>
    </Paper>
  );
};
