import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './views/home';
import Login from './views/login';

function App() {

  const navigate = useNavigate();

  useEffect(function () {

    fetch((process.env.REACT_APP_API_DOMAIN as string) + '/api/auth/check_token?token=' + localStorage.getItem('token'))
      .then(function (res) {
        return res.json();
      }).then(function (data: { isTokenValid: boolean, message: string }) {

        if (data.isTokenValid) {
          navigate('/home')
        } else {
          localStorage.clear();
          navigate('/login')
        }

      })

  }, [navigate]);

  return (
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
