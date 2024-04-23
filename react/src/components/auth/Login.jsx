import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const onSubmit = (data) => {
    if ((data)) {
      console.log("Usuario: " + data.user)
      console.log("Contraseña: " + data.password)
      navigate("/");
    } else {
      setLoginError("Credenciales incorrectas");
    }
  };

  return (
    <>
      <div className="container text-center mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Inicio de sesión</h3>
          <hr />

          <div className="form-group">
            <label>Usuario o email</label>
            <input
              id="user"
              className={`form-control ${errors.user ? "border border-danger" : ""}`}
              placeholder="Ingresa tu nombre de usuario o correo electrónico"
              type="text"
              {...register("user", { required: true })}
            />
            {errors.user && errors.user.type === "required" && (
              <span className="text-danger">Campo obligatorio</span>
            )}
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              id="password"
              className={`form-control ${errors.password ? "border border-danger" : ""}`}
              placeholder="Ingresa tu contraseña"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && errors.password.type === "required" && (
              <span className="text-danger">Campo obligatorio</span>
            )}
          </div>

          {loginError && (
            <div className="text-danger mb-3">
              <span>{loginError}</span>
            </div>
          )}

          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg btn-block">Iniciar sesión</button>
          </div>

          <div>
            <button onClick={() => { navigate("/register") }} className="btn btn-secondary btn-lg btn-block">¿No tienes una cuenta? Regístrate aquí</button>
            <button onClick={() => { navigate("/") }} className="btn btn-secondary">Volver</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;