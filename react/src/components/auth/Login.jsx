import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { doLogin } from '../../slices/auth/thunks';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {error} = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    dispatch(doLogin({ username: data.username, password: data.password }));
  };

  return (
    <>
      <div className="container text-center mt-5">
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Inicio de sesión</h3>
          <hr />

          <div className="form-group">
            <label>Usuario o email</label>
            <input
              id="username"
              className={`form-control ${errors.username ? "border border-danger" : ""}`}
              placeholder="Ingresa tu nombre de usuario o correo electrónico"
              type="text"
              {...register("username", { required: true })}
            />
            {errors.username && errors.username.type === "required" && (
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

          {/* {loginError && (
            <div className="text-danger mb-3">
              <span>{loginError}</span>
            </div>
          )} */}

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