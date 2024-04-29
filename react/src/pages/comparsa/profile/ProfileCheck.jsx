import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { user } from '../../../slices/auth/thunks';
import Profile from './Profile';
import { fetchProfileForm } from '../../../slices/profile/thunks';
import ProfileForm from './ProfileForm';

const ProfileCheck = () => {
    const dispatch = useDispatch();
    const { token, userData } = useSelector(state => state.auth);
    const { form, refresh, status } = useSelector(state => state.profile);

    useEffect(() => {
        dispatch(user(token))
        dispatch(fetchProfileForm())
    }, [refresh]);

    return (
        <div>
            {userData && userData.profile ? <Profile userData={userData} form={form} /> : <ProfileForm form={form} />}
        </div>
    );
}

export default ProfileCheck;
