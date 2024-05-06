import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from '../slices/auth/thunks';

const Header = () => {
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.auth);

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
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/" >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/friends" >
                                    Amigos
                                </NavLink>
                            </li>

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {userData && userData.username}
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/profile">Perfil</Link></li>
                                    <li><Link className="dropdown-item" to="/account">Cuenta</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <button className="dropdown-item d-flex align-items-center text-danger" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
