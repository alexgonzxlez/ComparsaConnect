import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import { NavLink } from 'react-router-dom'

const ContactsLayout = ({ children }) => {
    return (
        <Layout>
            <div className='navbar navbar-expand-lg navbar-light d-flex justify-content-center'>
                <NavLink to="/friends/list" className="nav-link mx-2">Amigos</NavLink>
                <NavLink to="/friends/search" className="nav-link mx-2" >Buscar</NavLink>
                <NavLink to="/friends/friend-request" className="nav-link mx-2" >Solicitudes (1)</NavLink>
                <NavLink to="/friends/pending-request" className="nav-link mx-2" >Enviadas (2)</NavLink>
            </div>
            {children}
        </Layout>
    )
}

export default ContactsLayout
