import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Prods from './Prods';
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Prods />} />
        <Route path="/products/" element={<Prods />} />
        <Route path="/products/:id" element={<Prods />} />
        <Route path="#/products/:id" element={<Prods />} />
        
        {/* <Route></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
