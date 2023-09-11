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
import config from '../../config'

export const Registration = () => {
  const [imageUrl, setImageUrl] = React.useState('');
  const inputRef = React.useRef(null)

  const handleChangeFile = async (event) => {
    try{
        const formData = new FormData()
        const file = await event.target.files[0];
        formData.append('image',file);
        const {data} = await config.post('/uploads/avatar',formData);
        setImageUrl(data.url)    
      }catch(err){
      console.log(err);
    }  
  };

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
      imageUrl: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    data.imageUrl = imageUrl
    console.log(data)
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
      <div className="register_img" >
        {imageUrl ?  
        (<Avatar
          sx={{ width: 100, height: 100 }} 
          src = {imageUrl}
          />)
        :
        (<>
        <label htmlFor="avatar-upload-button">
        <Button variant="outlined" component="span">
           Upload Avatar
        </Button>
        </label>
          <input
            ref={inputRef}
            type="file"
            id="avatar-upload-button"
            onChange={handleChangeFile}
            hidden
          />
          </>)}
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
