import React, { useEffect, useState } from 'react';
import { Card, Button, Dropdown, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, banUser } from '../../slices/admin/thunks';
import AdminLayout from './AdminLayout';

const UsersList = () => {
  const { users } = useSelector(state => state.admin);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [banReason, setBanReason] = useState('');
  const [usersWithBanForm, setUsersWithBanForm] = useState(new Set());

  useEffect(() => {
    dispatch(getUsers())
  }, []);

  const handleHideInfo = () => {
    setSelectedUser(null);
  };

  const handleBanUser = (friend) => {
    setUsersWithBanForm(new Set(usersWithBanForm.add(friend.id)));
    setSelectedUser(friend)
  }

  const handleConfirmBan = () => {
    dispatch(banUser(selectedUser.id, banReason)).then(() => {
      dispatch(getUsers())
    });
    setUsersWithBanForm(new Set([...usersWithBanForm].filter(userId => userId !== selectedUser.id)));
  }

  return (
    <AdminLayout>
      <div>
        <h2>Lista de Usuarios</h2>
        {users && users.map(friend => (
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
                      <Dropdown.Item onClick={() => handleBanUser(friend)}>Banear</Dropdown.Item>
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
            {selectedUser && selectedUser.id === friend.id && usersWithBanForm.has(friend.id) && (
              <Card>
                <Card.Body>
                  <Form.Group>
                    <Form.Label>Motivo del ban</Form.Label>
                    <Form.Control type="text" placeholder="Introduce el motivo del ban" value={banReason} onChange={(e) => setBanReason(e.target.value)} />
                  </Form.Group>
                  <Button variant="danger" onClick={handleConfirmBan}>Confirmar Ban</Button>
                  <Button variant="secondary" onClick={() => setUsersWithBanForm(prevSet => new Set([...prevSet].filter(userId => userId !== friend.id)))}>Cancelar</Button>
                </Card.Body>
              </Card>
            )}
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
export default UsersList;