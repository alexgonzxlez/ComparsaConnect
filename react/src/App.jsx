import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { verifyToken } from './slices/auth/thunks';
import Home from './pages/Home';
import './App.scss';
import LoginRegister from './pages/auth/LoginRegister';
import Account from './pages/auth/Account';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS
import ProfileForm from './pages/comparsa/ProfileForm';

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
      {token ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/profile" element={<ProfileForm />} />
        </Routes>
      ) : (
        <LoginRegister />
      )}
    </>
  )
}

export default App
