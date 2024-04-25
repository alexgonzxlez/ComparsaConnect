import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { verifyToken } from './slices/auth/thunks';
import Home from './pages/Home';
import './App.scss';
import LoginRegister from './pages/auth/LoginRegister';
import Profile from './pages/auth/Profile';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS
import NotFound from './components/NotFound';

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
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      ) : (
        <LoginRegister />
      )}
    </>
  )
}

export default App
