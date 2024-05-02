import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { user } from './slices/auth/thunks';
import Home from './pages/Home';
import './App.scss';
import LoginRegister from './pages/auth/LoginRegister';
import Account from './pages/auth/Account';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS
import NotFound from './components/NotFound';
import ProfileCheck from './pages/profile/ProfileCheck';
import FriendSearcher from './pages/contacts/FriendSearcher';
import FriendRequest from './pages/contacts/FriendRequest';

function App() {

  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(user(token));
    }
  }, [token]);

  return (
    <>
      {token ? (
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/profile" element={<ProfileCheck />} />
          <Route path="/friend-search" element={<FriendSearcher />} />
          <Route path="/friend-request" element={<FriendRequest />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  )
}

export default App
