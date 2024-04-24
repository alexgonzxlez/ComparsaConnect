import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Home from './components/pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { verifyToken } from './slices/auth/thunks';

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
