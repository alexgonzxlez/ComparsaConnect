import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Home from './components/pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';

function App() {

  const { token } = useSelector(state => state.auth);

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
