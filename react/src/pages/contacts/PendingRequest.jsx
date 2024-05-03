import React, { useEffect } from 'react'
import ContactsLayout from './ContactsLayout'
import { useSelector, useDispatch } from 'react-redux';
import { checkPendingRequest, cancelFriendRequest } from '../../slices/friendship/thunks';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Card, Button } from 'react-bootstrap';
import TimeAgo from "react-timeago";
import spanishStrings from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { XCircle } from 'react-bootstrap-icons';

const PendingRequest = () => {
    const { pendingList, isLoading } = useSelector(state => state.friendship);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkPendingRequest());
    }, [dispatch]);

    if (isLoading) {
        return <LoadingSpinner />
    }

    const handleReject = (id) => {
        dispatch(cancelFriendRequest(id)).then(() => {
            dispatch(checkPendingRequest());
        });
    };
    console.log(pendingList)

    return (
        <ContactsLayout>
            <div>
                <h2>Solicitudes enviadas</h2>
                {pendingList && pendingList.length > 0 ? (
                    <div>
                        {pendingList.map((request, index) => (
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
    )
}

export default PendingRequest