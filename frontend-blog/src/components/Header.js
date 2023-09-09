import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import '../css/Header.css'; 
import {  useDispatch, useSelector } from 'react-redux';
import { isAuth,logout,selectUserData } from '../redux/slices/auth.js';
export const Header = () => {

 const dispatch = useDispatch();
 
 const userData = useSelector(selectUserData);

 const Auth = useSelector(isAuth)
 const onClickLogout = () => {
  if(window.confirm('Are you sure you want to logout?')){
    dispatch(logout());
    window.localStorage.removeItem('token');
  } 
 }
  return (
    <div className="header">
      <Container maxWidth="lg">
        <div className="header_name">
        {Auth ? (
        <Link to="/" className="homepage-link">
        <div className="homepage-container">
        <h1 className="user-name">
          <img className="avatar-main-url" src={userData.imageUrl || '/noavatar.png'} alt="User Avatar" />
        {userData.fullName}'s Page
        </h1>
        </div>
      </Link>
      ) : (
        <Link to="/">
        <div>Posts</div>
      </Link>
      )}
          <div className="buttons">
            {Auth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Write Post</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="contained">Login</Button>
                </Link>
                <Link to="/registration">
                  <Button variant="contained">Create Account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};