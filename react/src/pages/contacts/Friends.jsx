import React, { useEffect } from 'react'
import ContactsLayout from './ContactsLayout'
import { useSelector, useDispatch } from 'react-redux';
import { listFriends, cancelFriendRequest } from '../../slices/friendship/thunks';
import { Card, Button } from 'react-bootstrap';
import { XCircle } from 'react-bootstrap-icons';
import LoadingSpinner from '../../components/LoadingSpinner';

const Friends = () => {
    const { friends, isLoading } = useSelector(state => state.friendship);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listFriends());
    }, [dispatch]);

    const handleRemoveFriend = (id) => {
        dispatch(cancelFriendRequest(id)).then(() => {
            dispatch(listFriends());
        });
    };

    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <ContactsLayout>
            <h2>Amigos</h2>
            <div className="row">
                {friends && friends.length > 0 ? (
                    friends.map(friend => (
                        <div key={friend.id} className="col-12 mb-3">
                            <Card>
                                <Card.Body>
                                    {friend.profile && friend.profile.file && friend.profile.file.filepath ? (
                                        <img src={process.env.API_STORAGE + friend.profile.file.filepath} alt="Imagen actual" className='img-fluid rounded-circle float-start' style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px', marginTop: '10px' }} />
                                    ) : (
                                        <img src={process.env.API_STORAGE + "uploads/" + "noimage.png"} alt="No Image" className='img-fluid rounded-circle float-start' style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px', marginTop: '10px' }} />
                                    )}
                                    <Card.Title>{friend.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{friend.email}</Card.Subtitle>
                                    {/* Agrega aquí el resto de la información que deseas mostrar */}
                                    <div className="d-flex justify-content-end">
                                        <Button onClick={() => handleRemoveFriend(friend.id)}><XCircle /></Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                ) : (
                    <p>No tienes amigos.</p>
                )}
            </div>
        </ContactsLayout>
    )
}

export default Friends