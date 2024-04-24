import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { doLogout } from '../slices/auth/thunks';

const Header = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(doLogout())
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
                <div className="container px-5">
                    <Link to="/" className="navbar-brand">
                        ComparsaConnect
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/" >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/profile">
                                    Perfil
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link link-danger" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
