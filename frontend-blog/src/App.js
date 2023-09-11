import React from "react";
import Container from "@mui/material/Container";
import {Header} from "./components/Header.js"; 
import {Route, Routes} from "react-router-dom";
import {Home } from "./pages/Home.js";
import {FullPost} from "./pages/posts/FullPost.js";
import { Registration } from "../src/pages/authentification/Register.js";
import { Login } from "../src/pages/authentification/Login.js";
import { AddPost } from "../src/pages/posts/AddPost.js";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, isAuth } from "./redux/slices/auth";


function App() {

  const dispatch = useDispatch();
  const Auth = useSelector(isAuth)
  console.log(Auth);

 
  React.useEffect(() => {
    dispatch(fetchUser())
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, [dispatch]);
  return (
  <>
    <Header/>
    <Container>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path = "/posts/:id" element = {<FullPost />} />
      <Route path = "/posts/:id/edit" element = {<AddPost />} />
      <Route path = "/add-post" element = {<AddPost />} />
      <Route path="/login" element={<Login/>} />
      <Route path = "/registration" element = {<Registration />} />
      </Routes>
    </Container>
  </>
  );
}

export default App;
