import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { doRegister } from '../../../slices/auth/thunks';
import { useSelector, useDispatch } from "react-redux";

const Register = () => {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting }, watch } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, errs } = useSelector((state) => state.auth);

  useEffect(() => {
    if (errs) {
      Object.entries(errs).forEach(([key, errArr]) => {
        errArr.forEach(err => {
          setError(key, { type: 'custom', message: err })
        });
      });
    }
  }, [errs]);

  const onSubmit = (data) => {
    dispatch(doRegister({ name: data.name, email: data.email, username: data.username, password: data.password }));
  }

  const password = watch("password", "");

  return (
    <>
      <div className="container text-center mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Registro</h3>
          <hr />

          <div className="form-group">
            <label>Nombre completo</label>
            <input
              id="name"
              className={`form-control ${errors.name ? "border border-danger" : ""}`}
              placeholder="Ej: María González"
              type="text"
              {...register("name", { required: true, pattern: /^[^\s]+(?:\s[^\s]+)+$/ })}
            />
            {errors.name && errors.name.type === "required" && (
              <span className="text-danger">Campo obligatorio</span>
            )}
            {errors.name && errors.name.type === "pattern" && (
              <span className="text-danger">El campo debe contener minimo 2 palabras</span>
            )}
          </div>

          <div className="form-group">
            <label>Nombre de usuario</label>
            <input
              id="username"
              className={`form-control ${errors.username ? "border border-danger" : ""}`}
              placeholder="Ej: MaríaG"
              type="text"
              {...register("username", { required: true, minLength: 2, maxLength: 20 })}
            />
            {errors.username && errors.username.type === "required" && (
              <span className="text-danger">Campo obligatorio</span>
            )}
            {errors.username && errors.username.type === "minLength" && (
              <span className="text-danger">El campo debe contener minimo 2 letras</span>
            )}
            {errors.username && errors.username.type === "maxLength" && (
              <span className="text-danger">El campo puede contener un maximo de 20 letras</span>
            )}
            {errors.username && errors.username.type === "custom" && (
              <span className="text-danger">{errors.username.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              id="email"
              className={`form-control ${errors.email ? "border border-danger" : ""}`}
              placeholder="Ej: maria.gonzalez@gmail.com"
              type="text"
              {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
            />
            {errors.email && errors.email.type === "required" && (
              <span className="text-danger">Campo obligatorio</span>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <span className="text-danger">Correo no valido</span>
            )}
            {errors.email && errors.email.type === "custom" && (
              <span className="text-danger">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              id="password"
              className={`form-control ${errors.password ? "border border-danger" : ""}`}
              placeholder="Ej: maria1234"
              type="password"
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password && errors.password.type === "required" && (
              <span className="text-danger">Campo obligatorio</span>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <span className="text-danger">Mínimo 8 caracteres</span>
            )}
          </div>

          <div className="form-group">
            <label>Repite la contraseña</label>
            <input
              id="password2"
              className={`form-control ${errors.password2 ? "border border-danger" : ""}`}
              placeholder="Ej: maria1234"
              type="password"
              {...register("password2", {
                required: true,
                minLength: 8,
                validate: (value) => value === password || "Las contraseñas no coinciden"
              })}
            />
            {errors.password2 && errors.password2.type === "required" && (
              <span className="text-danger">Campo obligatorio</span>
            )}
            {errors.password2 && errors.password2.type === "minLength" && (
              <span className="text-danger">Mínimo 8 caracteres</span>
            )}
            {errors.password2 && errors.password2.type === "validate" && (
              <span className="text-danger">{errors.password2.message}</span>
            )}
          </div>
          
          {error && <div>{error}</div>}

          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={isSubmitting}>Registrarse</button>
          </div>

          <div className="form-group">
            <button onClick={() => { navigate("/login") }} className="btn btn-secondary btn-lg btn-block">¿Ya tienes una cuenta? Inicia sesión aquí</button>
            <button onClick={() => { navigate("/") }} className="btn btn-secondary">Volver</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;