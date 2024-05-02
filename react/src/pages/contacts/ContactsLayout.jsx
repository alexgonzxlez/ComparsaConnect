import React from 'react'
import Layout from '../../components/Layout'
import { Link, NavLink } from 'react-router-dom'

const ContactsLayout = ({ children }) => {
    return (
        <Layout>
            <div className='navbar navbar-expand-lg navbar-light d-flex justify-content-center'>
                <NavLink to="/contacts" className="nav-link mx-2">Amigos</NavLink>
                <NavLink to="/posts/grid" className="nav-link mx-2" >Buscar</NavLink>
                <NavLink to="/friends-request" className="nav-link mx-2" >Solicitudes (1)</NavLink>
            </div>
            {children}
        </Layout>
    )
}

export default ContactsLayout
