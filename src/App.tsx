import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './views/home';
import Login from './views/login';

function App() {
  return (
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
