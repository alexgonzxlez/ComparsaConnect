import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
    const { userData } = useSelector(state => state.auth);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div>
            <h2>Profile</h2>
            {userData ? (
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Nombre</th>
                            <td>{userData.name}</td>
                        </tr>
                        <tr>
                            <th>Nombre de usuario</th>
                            <td>{userData.username}</td>
                        </tr>
                        <tr>
                            <th>Correo electrónico</th>
                            <td>{userData.email}</td>
                        </tr>
                        <tr>
                            <th>Fecha de creación</th>
                            <td>{formatDate(userData.created_at)}</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>No hay datos disponibles</p>
            )}
        </div>
    );
}

export default Profile;