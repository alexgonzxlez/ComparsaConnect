import React, { useEffect, useState } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBTypography,
    MDBTextArea,
    MDBCardHeader,
} from "mdb-react-ui-kit";
import Layout from "../../components/Layout";
import './Chat.css';
import { getAcceptedMatch } from "../../slices/match/thunks";
import { useDispatch, useSelector } from "react-redux";
import TimeAgo from "react-timeago";
import spanishStrings from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import Conversacion from "./Conversacion";

const Chat = () => {
    const { accepted } = useSelector(state => state.match);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAcceptedMatch())
        document.title = 'ComparsaConnect - Chats';
    }, []);

    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    }

    return (
        <Layout>
            <MDBContainer fluid className="py-3 gradient-custom">
                <MDBRow>
                    <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                        <h5 className="font-weight-bold mb-3 text-center">
                            Usuarios
                        </h5>
                        <MDBCard className="mask-custom overflow-auto" style={{ maxHeight: '750px', overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            <MDBCardBody>
                                <MDBTypography listUnStyled className="mb-0">
                                    {accepted && accepted.map(match => (
                                        <li key={match.id} className="p-2 border-bottom">
                                            <a className="d-flex justify-content-between link-light text-decoration-none" onClick={() => handleUserClick(match.user || match.user2)}>
                                                <div className="d-flex flex-row">
                                                    <img
                                                        src={process.env.API_STORAGE + (match.user ? match.user.profile.file.filepath : match.user2.profile.file.filepath)}
                                                        alt="avatar"
                                                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                                        width="60"
                                                        height="60"
                                                    />
                                                    <div className="pt-1">
                                                        <p className="fw-bold mb-0 text-black">
                                                            {match.user ? (match.user.name.length > 15 ? `${match.user.name.substring(0, 15)}...` : match.user.name) : (match.user2.name.length > 15 ? `${match.user2.name.substring(0, 15)}...` : match.user2.name)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="pt-1 text-black">
                                                    <MDBIcon>
                                                        <TimeAgo
                                                            date={match.user ? match.user.updated_at : match.user2.updated_at}
                                                            formatter={buildFormatter(spanishStrings)}
                                                        />
                                                    </MDBIcon>
                                                </div>
                                            </a>
                                        </li>
                                    ))}
                                </MDBTypography>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="6" lg="7" xl="8">
                        <Conversacion selectedUser={selectedUser} />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </Layout >
    );
}

export default Chat;