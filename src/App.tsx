import React, { createContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from './views/main';
import Login from './views/login';
import Register from './views/register';

export const UserContext = createContext({} as { userInfo: { _id: string, name: string, teamName: string, role: string } | null, setuserInfo: React.Dispatch<React.SetStateAction<{ _id: string, name: string, teamName: string, role: string, } | null>> });

function App() {

  const navigate = useNavigate();

  const [userInfo, setuserInfo] = useState<{ _id: string, name: string, teamName: string, role: string } | null>(null);

  useEffect(function () {

    fetch((process.env.REACT_APP_API_DOMAIN as string) + '/api/auth/check_token?token=' + localStorage.getItem('token'))
      .then(function (res) {
        return res.json();
      }).then(function (data: { isTokenValid: boolean, message: string }) {

        if (data.isTokenValid) {
          navigate('/main');
        } else if (/\/register$/.test(window.location.href)){
          navigate('/register');
        }
         else {
          localStorage.clear();
          navigate('/login');
        }

      })

  }, [navigate]);

  return (
    <UserContext.Provider value={{ userInfo: userInfo, setuserInfo: setuserInfo }}>
      <Routes>
        <Route path="main" element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
