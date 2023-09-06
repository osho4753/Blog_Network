import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import '../css/Header.css'; 

export const Header = () => {
  return (
    <div className="header">
      <Container maxWidth="lg">
        <div className="header_name">
          <Link to="/">
            <div>Mamanov Page</div>
          </Link>
          <div className="buttons">
            {(true, false) ? (
              <>
                <Link to="/posts/create">
                  <Button variant="contained">Write Post</Button>
                </Link>
                <Button variant="contained" color="error">
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