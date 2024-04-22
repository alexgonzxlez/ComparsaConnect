import React from 'react'
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importamos los estilos de Bootstrap

const Home = () => {
  return (
    <>
      <div className="container text-center mt-5">
        <h1 className="mb-4">¡Bienvenido a nuestra aplicación!</h1>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <Link to={"/login"} className="btn btn-primary btn-lg btn-block mb-3">Iniciar sesión</Link>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <Link to={"/register"} className="btn btn-secondary btn-lg btn-block">Registrarse</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;