import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers, sendFriendRequest, cancelFriendRequest, acceptFriendRequest } from '../../slices/friendship/thunks';
import LoadingSpinner from '../../components/LoadingSpinner';
import ContactsLayout from './ContactsLayout'

const FriendSearcher = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const { searchdata } = useSelector(state => state.friendship);
    const [searchTerm, setSearchTerm] = useState('');
    const [buttonText, setButtonText] = useState('Solicitud enviada');

    const onSubmit = (data) => {
        dispatch(searchUsers(data.filter))
        reset()
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.length >= 3) {
            dispatch(searchUsers(value));
        }
    };

    const handleAcceptFriendRequest = (id) => {
        dispatch(acceptFriendRequest(id))
    }

    const handleSendFriendRequest = (id) => {
        dispatch(sendFriendRequest(id))
    }

    const handleCancelFriendRequest = (id) => {
        dispatch(cancelFriendRequest(id))
    }

    return (
        <ContactsLayout>
            <form className="m-3 mx-auto" onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '550px' }}>
                <div className="input-group">
                    <input
                        className={`form-control ${errors.filter ? "is-invalid" : ""}`}
                        type="text"
                        placeholder="Buscar usuarios..."
                        {...register('filter', { required: true })}
                        value={searchTerm}
                        onChange={handleChange}
                    />
                    <Button variant="primary" type="submit">
                        <Search size={21} />
                    </Button>
                </div>
            </form>
            {searchTerm && searchdata && searchdata.length > 0 ? (
                <div className="search-results">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Joined</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchdata.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>@{user.username}</td>
                                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                    <td>
                                        {user.friend_status === 'accepted' ? (
                                            <Button onClick={() => handleCancelFriendRequest(user.id)} variant="danger" className="btn">
                                                Eliminar amigo
                                            </Button>
                                        ) : user.friend_status === 'sended' ? (
                                            <Button onMouseOver={() => setButtonText('Cancelar')} onMouseOut={() => setButtonText('Solicitud enviada')} onClick={() => handleCancelFriendRequest(user.id)} variant="primary" className="btn">
                                                {buttonText}
                                            </Button>
                                        ) : user.friend_status === 'pending' ? (
                                            <Button onClick={() => handleAcceptFriendRequest(user.id)} variant="success" className="btn">
                                                Aceptar solicitud
                                            </Button>
                                        ) : (
                                            <Button onClick={() => handleSendFriendRequest(user.id)} variant="primary" className="btn">
                                                Enviar solicitud
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : searchTerm ? (
                <div className="search-results">
                    <p>No se encontraron resultados.</p>
                </div>
            ) : null}
        </ContactsLayout>
    );
};

export default FriendSearcher;