import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getProfile } from '../../slices/profile/thunks';
import ProfileForm from '../profile/ProfileForm';
import Layout from '../../components/Layout';
import { useNotification } from '../../components/Notifications/useNotification';

const Comparsas = () => {
    const dispatch = useDispatch();
    const { profile, refresh, isLoading } = useSelector(state => state.profile);
    const { displayNotification } = useNotification();

    useEffect(() => {
        dispatch(getProfile());
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if ( profile === null) {
        displayNotification({
            message: "Parece que no tienes un perfil todavia, asegurate de crearlo para empezar a hacer match's",
            type: "error"
        });

        return <ProfileForm/>; 
    }

    return (
        <Layout>
            Si tiene
        </Layout>
    );
};

export default Comparsas;
