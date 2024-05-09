import React, { useEffect, useState } from 'react';
import { Card, Button, Dropdown, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getBannedUsers, unbanUser } from '../../slices/admin/thunks';
import AdminLayout from './AdminLayout';

const UsersBannedList = () => {
    const { bannedUsers } = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const [selectedUser, setSelectedUser] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        dispatch(getBannedUsers())
    }, []);

    const handleHideInfo = () => {
        setSelectedUser(null);
    };

    const handleUnbanUser = (friend) => {
        setSelectedUser(friend);
        setShowConfirmation(true);
    }

    const confirmUnban = () => {
        dispatch(unbanUser(selectedUser.id)).then(() => {
            dispatch(getBannedUsers());
        });
        setShowConfirmation(false);
    }

    const cancelUnban = () => {
        setSelectedUser(null);
        setShowConfirmation(false);
    }

    return (
        <AdminLayout>
            <div>
                <h2>Lista de Usuarios</h2>
                {bannedUsers && bannedUsers.map(friend => (
                    <div key={friend.id}>
                        <Card>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        {friend.profile && friend.profile.file && friend.profile.file.filepath ? (
                                            <img
                                                src={process.env.API_STORAGE + friend.profile.file.filepath}
                                                alt="Imagen actual"
                                                className='img-fluid rounded-circle float-start'
                                                style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px', marginTop: '10px' }}
                                            />
                                        ) : (
                                            <img
                                                src={process.env.API_STORAGE + "uploads/" + "noimage.png"}
                                                alt="No Image"
                                                className='img-fluid rounded-circle float-start'
                                                style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px', marginTop: '10px' }}
                                            />
                                        )}
                                        <div className="d-inline-block text-truncate">
                                            <Card.Title>@{friend.username}</Card.Title>
                                        </div>
                                    </div>
                                    <Dropdown>
                                        <Dropdown.Toggle>
                                            Opciones
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => setSelectedUser(friend)}>Ver más información</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleUnbanUser(friend)}>Desbanear</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Card.Body>
                        </Card>
                        {selectedUser && selectedUser.id === friend.id && (
                            <Card>
                                <Card.Body>
                                    <Card.Title>Información adicional de {selectedUser.name}</Card.Title>
                                    <Card.Text>Email: {selectedUser.email}</Card.Text>
                                    {selectedUser.profile ? (
                                        <>
                                            <Card.Text>Descripción: {selectedUser.profile.description || 'No disponible'}</Card.Text>
                                            <Card.Text>Fecha de Nacimiento: {selectedUser.profile.birthdate || 'No disponible'}</Card.Text>
                                            <Card.Text>Género: {selectedUser.profile.gender && selectedUser.profile.gender.name || 'No disponible'}</Card.Text>
                                            <Card.Text>Bandera: {selectedUser.profile.bandera && selectedUser.profile.bandera.name || 'No disponible'}</Card.Text>
                                            <Card.Text>Preferencia de género: {selectedUser.profile.gender_pref && selectedUser.profile.gender_pref.name || 'No disponible'}</Card.Text>
                                        </>
                                    ) : (
                                        <p>Usuario sin perfil</p>
                                    )}
                                    <Button variant="secondary" onClick={handleHideInfo}>Ocultar información</Button>
                                </Card.Body>
                            </Card>
                        )}
                    </div>
                ))}
            </div>
            <Modal show={showConfirmation} onHide={cancelUnban}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar desban</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que quieres desbanear a {selectedUser && selectedUser.username}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelUnban}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmUnban}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </AdminLayout>
    );
}
export default UsersBannedList;