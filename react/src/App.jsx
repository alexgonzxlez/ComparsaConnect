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
import PendingRequest from './pages/contacts/PendingRequest';
import Friends from './pages/contacts/Friends';
// import Comparsa from './pages/comparsa/Comparsa';
import ComparsaCheck from './pages/comparsa/ComparsaCheck';
import UsersList from './pages/admin/UsersList';
import UsersBannedList from './pages/admin/UsersBannedList';
import ChatBox from './pages/chat/ChatBox';

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
          <Route path="/friends" element={<Navigate to="/friends/list" />} />
          <Route path="/friends/search" element={<FriendSearcher />} />
          <Route path="/friends/friend-request" element={<FriendRequest />} />
          <Route path="/friends/pending-request" element={<PendingRequest />} />
          <Route path="/friends/list" element={<Friends />} />
          <Route path="/comparsas" element={<ComparsaCheck />} />
          <Route path="/moderate-users" element={<UsersList />} />
          <Route path="/moderate-banned-users" element={<UsersBannedList />} />
          <Route path="/chat" element={<ChatBox/>} />
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
