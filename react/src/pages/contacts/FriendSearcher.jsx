import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../../components/Layout';
import { Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../../slices/friendship/thunks';
import LoadingSpinner from '../../components/LoadingSpinner';

const FriendSearcher = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const { searchdata } = useSelector(state => state.friendship);
    const onSubmit = (data) => {
        dispatch(searchUsers(data.filter))
        reset()
    };

    return (
        <Layout>
            <form className="m-3 mx-auto" onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '550px' }}>
                <div className="input-group">
                    <input
                        className={`form-control ${errors.filter ? "is-invalid" : ""}`}
                        type="text"
                        placeholder="Buscar usuarios..."
                        {...register('filter', { required: true })}
                    />
                    <Button variant="primary" type="submit">
                        <Search size={21} />
                    </Button>
                </div>
            </form>
            {searchdata && searchdata.length > 0 ? (
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
                                        <Button variant="primary" className="btn">
                                            {user.friend_status === 'accepted' ? "Eliminar amigo" :
                                                user.friend_status === 'pending' ? "Aceptar solicitud" :
                                                    "Enviar solicitud"}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : searchdata ? (
                <div className="search-results">
                    <p>No se encontraron resultados.</p>
                </div>
            ) : null}
        </Layout>
    );
};

export default FriendSearcher;
