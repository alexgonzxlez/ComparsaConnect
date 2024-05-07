import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import { NavLink } from 'react-router-dom'

const ContactsLayout = ({ children }) => {
    return (
        <Layout>
            <div className='navbar navbar-expand-lg navbar-light d-flex justify-content-center'>
                <NavLink to="/contacts" className="nav-link mx-2">Amigos</NavLink>
                <NavLink to="/friend-search" className="nav-link mx-2">Buscar</NavLink>
                <NavLink to="/friend-request" className="nav-link mx-2">Solicitudes</NavLink>
                <NavLink to="/pending-request" className="nav-link mx-2">Enviadas</NavLink>
            </div>
            {children}
        </Layout>
    )
}

export default ContactsLayout
