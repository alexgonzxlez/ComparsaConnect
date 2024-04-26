import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { user } from '../../../slices/auth/thunks';
import Profile from './Profile';
import ProfileForm from './ProfileForm';
import { profileForm } from '../../../slices/profile/thunks';

const ProfileCheck = () => {
    const dispatch = useDispatch();
    const { token, userData } = useSelector(state => state.auth);
    const { form, refresh } = useSelector(state => state.profile);

    useEffect(() => {
        dispatch(user(token));
        dispatch(profileForm())
    }, [refresh]);
    return (
        <div>
            {userData && userData.profile ? <Profile userData={userData} form={form} /> : <ProfileForm form={form} />}
        </div>
    );
}

export default ProfileCheck;
