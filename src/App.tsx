import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { Container } from "@mui/material";
import Home from "./pages/Home";
import Header from "./pages/Header";
import Category from "./pages/Category";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
