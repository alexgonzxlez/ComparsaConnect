import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { user } from '../../../slices/auth/thunks';
import Profile from './Profile';
import ProfileForm from './ProfileForm';
import { profileForm } from '../../../slices/comparsa/thunks';

const ProfileCheck = () => {
    const dispatch = useDispatch();
    const { token, userData } = useSelector(state => state.auth);
    const { form } = useSelector(state => state.comparsa);

    useEffect(() => {
        dispatch(user(token));
        dispatch(profileForm())
    }, []);
    return (
        <div>
            {userData && userData.profile ? <Profile userData={userData} form={form} /> : <ProfileForm form={form} />}
        </div>
    );
}

export default ProfileCheck;
