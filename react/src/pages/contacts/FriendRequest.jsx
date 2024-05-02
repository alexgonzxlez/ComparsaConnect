import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listFriendRequest } from '../../slices/friendship/thunks';
import TimeAgo from "react-timeago";
import spanishStrings from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { Card, Button } from 'react-bootstrap';
import { acceptFriendRequest, cancelFriendRequest } from '../../slices/friendship/thunks';
import { CheckCircle, XCircle } from 'react-bootstrap-icons';
import LoadingSpinner from '../../components/LoadingSpinner';
import ContactsLayout from './ContactsLayout'

const FriendRequest = () => {
    const { requestsList, isLoading } = useSelector(state => state.friendship);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listFriendRequest());
    }, []);

    const handleAccept = (id) => {
        dispatch(acceptFriendRequest(id))
    };

    const handleReject = (id) => {
        dispatch(cancelFriendRequest(id))
    };
    if (isLoading) {
        return <LoadingSpinner/>
    }

    return (
        <ContactsLayout>
            <div>
                <h2>Solicitudes de amistad</h2>
                {requestsList ? (
                    <div>
                        {requestsList.map((request, index) => (
                            <Card key={index} className="my-2">
                                <Card.Body>
                                    <Card.Title>{request.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{request.username}</Card.Subtitle>
                                    <Card.Text>
                                        Solicitud enviada:{" "}
                                        <TimeAgo
                                            date={request.created_at}
                                            formatter={buildFormatter(spanishStrings)}
                                        />
                                    </Card.Text>
                                    <div className="d-flex justify-content-end">
                                        <Button style={{ marginRight: '0.5rem' }} onClick={() => handleAccept(request.id)}>
                                            <CheckCircle />
                                        </Button>
                                        <Button onClick={() => handleReject(request.id)}>
                                            <XCircle />
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p>No hay solicitudes de amistad.</p>
                )}
            </div>
        </ContactsLayout>
    );
};

export default FriendRequest;