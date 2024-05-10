import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileForm from '../profile/ProfileForm';
import { getProfile } from '../../slices/profile/thunks';
import LoadingSpinner from '../../components/LoadingSpinner';
import Comparsa from './Comparsa';

const ComparsaCheck = () => {
    const dispatch = useDispatch();
    const { profile, form, refresh, isLoading } = useSelector(state => state.profile);

    useEffect(() => {
        dispatch(getProfile())
    }, [refresh]);

    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <div>
            {profile && profile ? <Comparsa /> : <ProfileForm />}
        </div>
    );
}

export default ComparsaCheck