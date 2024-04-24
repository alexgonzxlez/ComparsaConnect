import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { verifyToken } from './slices/auth/thunks';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import './App.scss';

function App() {

  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(verifyToken(token));
    }
  }, [token]);

  return (
    <>
      <Routes>
        {token &&
          <Route path="/" element={<Home />} />
        }
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
