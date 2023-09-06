import React from "react";
import Container from "@mui/material/Container";
import {Header} from "./components/Header.js"; 
import {Route, Routes} from "react-router-dom";
import {Home } from "./pages/Home.js";


function App() {
  return (
  <>
    <Header/>
    <Container>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path=""/>
      <Route path=""/>
      <Route path=""/>
      <Route path=""/>
      </Routes>
    </Container>
  </>
  );
}

export default App;
