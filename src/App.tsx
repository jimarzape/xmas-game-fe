import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { Container } from "@mui/material";
import Home from "./pages/Home";
import Header from "./pages/Header";
import Category from "./pages/Category";
import FamilyGroup from "./pages/Family";
import People from "./pages/People";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/family-group" element={<FamilyGroup />} />
            <Route path="/people" element={<People />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
