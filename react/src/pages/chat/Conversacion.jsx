import React from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBTypography,
    MDBCardHeader,
    MDBInputGroup,
    MDBBtn
} from "mdb-react-ui-kit";
import { Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import TimeAgo from "react-timeago";
import spanishStrings from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

const Conversacion = ({ selectedUser }) => {
    const { userData } = useSelector(state => state.auth);

    return (
        <>
            {selectedUser && (
                <>
                    <div className="d-flex flex-column w-auto">
                        <div className="conversation-header d-flex align-items-center mb-4 bg-primary p-3 border border-white border-radius">
                            <Image
                                src={process.env.API_STORAGE + selectedUser.profile.file.filepath}
                                alt="avatar"
                                className="rounded-circle me-3 shadow-1-strong"
                                width={60}
                                height={60}
                            />
                            <p className="fw-bold mb-0 text-white">{selectedUser.name}</p>
                        </div>
                        <div className="message-container" style={{ maxHeight: '650px', overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            <MDBTypography listUnStyled className="text-white">
                                <li className="d-flex justify-content-between mb-4">
                                    <img
                                        src={process.env.API_STORAGE + selectedUser.profile.file.filepath}
                                        alt="avatar"
                                        className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                        width="60"
                                        height="60"
                                    />
                                    <MDBCard className="mask-custom">
                                        <MDBCardHeader
                                            className="d-flex justify-content-between p-3"
                                            style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                                        >
                                            <p className="fw-bold mb-0">{selectedUser.name}</p>
                                            <p className="text-light small mb-0">
                                                <MDBIcon far icon="clock" />
                                                <TimeAgo
                                                    date={selectedUser.updated_at}
                                                    formatter={buildFormatter(spanishStrings)}
                                                />
                                            </p>
                                        </MDBCardHeader>
                                        <MDBCardBody>
                                            <p className="mb-0">
                                                {selectedUser.profile.description}
                                            </p>
                                        </MDBCardBody>
                                    </MDBCard>
                                </li>
                                <li className="d-flex justify-content-between mb-4">
                                    <MDBCard className="w-100 mask-custom">
                                        <MDBCardHeader
                                            className="d-flex justify-content-between p-3"
                                            style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                                        >
                                            <p className="fw-bold mb-0">{userData.name}</p>
                                            <p className="text-light small mb-0">
                                                <MDBIcon far icon="clock" />
                                                <TimeAgo
                                                    date={userData.updated_at}
                                                    formatter={buildFormatter(spanishStrings)}
                                                />
                                            </p>
                                        </MDBCardHeader>
                                        <MDBCardBody>
                                            <p className="mb-0">
                                                {userData.profile.description}
                                            </p>
                                        </MDBCardBody>
                                    </MDBCard>
                                    <img
                                        src={process.env.API_STORAGE + userData.profile.file.filepath}
                                        alt="avatar"
                                        className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                                        width="60"
                                        height="60"
                                    />
                                </li>
                                <li className="d-flex justify-content-between mb-4">
                                    <img
                                        src={process.env.API_STORAGE + selectedUser.profile.file.filepath}
                                        alt="avatar"
                                        className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                        width="60"
                                        height="60"
                                    />
                                    <MDBCard className="mask-custom">
                                        <MDBCardHeader
                                            className="d-flex justify-content-between p-3"
                                            style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                                        >
                                            <p className="fw-bold mb-0">{selectedUser.name}</p>
                                            <p className="text-light small mb-0">
                                                <MDBIcon far icon="clock" />
                                                <TimeAgo
                                                    date={selectedUser.updated_at}
                                                    formatter={buildFormatter(spanishStrings)}
                                                />
                                            </p>
                                        </MDBCardHeader>
                                        <MDBCardBody>
                                            <p className="mb-0">
                                                {selectedUser.profile.description}
                                            </p>
                                        </MDBCardBody>
                                    </MDBCard>
                                </li>
                                <li className="d-flex justify-content-between mb-4">
                                    <MDBCard className="w-100 mask-custom">
                                        <MDBCardHeader
                                            className="d-flex justify-content-between p-3"
                                            style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                                        >
                                            <p className="fw-bold mb-0">{userData.name}</p>
                                            <p className="text-light small mb-0">
                                                <MDBIcon far icon="clock" />
                                                <TimeAgo
                                                    date={userData.updated_at}
                                                    formatter={buildFormatter(spanishStrings)}
                                                />
                                            </p>
                                        </MDBCardHeader>
                                        <MDBCardBody>
                                            <p className="mb-0">
                                                {userData.profile.description}
                                            </p>
                                        </MDBCardBody>
                                    </MDBCard>
                                    <img
                                        src={process.env.API_STORAGE + userData.profile.file.filepath}
                                        alt="avatar"
                                        className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                                        width="60"
                                        height="60"
                                    />
                                </li>
                                <li className="d-flex justify-content-between mb-4">
                                    <img
                                        src={process.env.API_STORAGE + selectedUser.profile.file.filepath}
                                        alt="avatar"
                                        className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                        width="60"
                                        height="60"
                                    />
                                    <MDBCard className="mask-custom">
                                        <MDBCardHeader
                                            className="d-flex justify-content-between p-3"
                                            style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                                        >
                                            <p className="fw-bold mb-0">{selectedUser.name}</p>
                                            <p className="text-light small mb-0">
                                                <MDBIcon far icon="clock" />
                                                <TimeAgo
                                                    date={selectedUser.updated_at}
                                                    formatter={buildFormatter(spanishStrings)}
                                                />
                                            </p>
                                        </MDBCardHeader>
                                        <MDBCardBody>
                                            <p className="mb-0">
                                                {selectedUser.profile.description}
                                            </p>
                                        </MDBCardBody>
                                    </MDBCard>
                                </li>
                                <li className="d-flex justify-content-between mb-4">
                                    <MDBCard className="w-100 mask-custom">
                                        <MDBCardHeader
                                            className="d-flex justify-content-between p-3"
                                            style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                                        >
                                            <p className="fw-bold mb-0">{userData.name}</p>
                                            <p className="text-light small mb-0">
                                                <MDBIcon far icon="clock" />
                                                <TimeAgo
                                                    date={userData.updated_at}
                                                    formatter={buildFormatter(spanishStrings)}
                                                />
                                            </p>
                                        </MDBCardHeader>
                                        <MDBCardBody>
                                            <p className="mb-0">
                                                {userData.profile.description}
                                            </p>
                                        </MDBCardBody>
                                    </MDBCard>
                                    <img
                                        src={process.env.API_STORAGE + userData.profile.file.filepath}
                                        alt="avatar"
                                        className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                                        width="60"
                                        height="60"
                                    />
                                </li>
                            </MDBTypography>
                        </div>
                    </div>
                    <MDBInputGroup className="mt-2">
                        <input className="form-control" placeholder="Type a message..." type="text" />
                        <button className="btn btn-primary">Enviar</button>
                    </MDBInputGroup>
                </>
            )}
        </>
    );
}

export default Conversacion;