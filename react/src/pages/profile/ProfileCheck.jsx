import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Profile from './Profile';
import ProfileForm from './ProfileForm';
import { getProfile } from '../../slices/profile/thunks';
import LoadingSpinner from '../../components/LoadingSpinner';
const ProfileCheck = () => {
    const dispatch = useDispatch();
    const { profile, form, refresh, isLoading } = useSelector(state => state.profile);

    useEffect(() => {
        dispatch(getProfile())
    }, [refresh]);

    if (isLoading) {
        return <LoadingSpinner/>
    }
    return (
        <div>
            {profile && profile ? <Profile profile={profile} form={form} /> : <ProfileForm form={form} />}
        </div>
    );
}

export default ProfileCheck;
