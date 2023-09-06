import React from "react";
import Container from "@mui/material/Container";
import {Header} from "./components/Header.js"; 
import {Route, Routes} from "react-router-dom";
import {Home } from "./pages/Home.js";
import {FullPost} from "./pages/posts/FullPost.js";
import { Registration } from "../src/pages/authentification/Register.js";
import { Login } from "../src/pages/authentification/Login.js";
import { AddPost } from "../src/pages/posts/AddPost.js";

function App() {
  return (
  <>
    <Header/>
    <Container>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path = "/posts/:id" element = {<FullPost />} />
      <Route path = "/add-post" element = {<AddPost />} />
      <Route path="/login" element={<Login/>} />
      <Route path = "/registration" element = {<Registration />} />
      </Routes>
    </Container>
  </>
  );
}

export default App;
