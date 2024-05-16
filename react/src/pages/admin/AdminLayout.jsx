import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Layout from '../../components/Layout';

const AdminLayout = ({ children }) => {
    const { userData } = useSelector(state => state.auth);
    document.title = 'ComparsaConnect - Administrador';

    return (
        <Layout>
            {userData && userData.role === 1 ? (
                <>
                    <div className='navbar navbar-expand-lg navbar-light d-flex justify-content-center'>
                        <NavLink to="/moderate-users" className="nav-link mx-2">Usuarios</NavLink>
                        <NavLink to="/moderate-banned-users" className="nav-link mx-2" >Usuarios Baneados</NavLink>
                    </div>
                    {children}
                </>
            ) : (
                <p>No tienes permisos</p>
            )}
        </Layout>
    );
}

export default AdminLayout;