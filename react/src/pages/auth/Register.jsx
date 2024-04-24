import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { doRegister } from '../../slices/auth/thunks';

const Register = ({ setSwap }) => {
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Registro</h3>
              <hr />

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-1">
                  <label htmlFor="name">Nombre completo</label>
                  <input
                    id="name"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    placeholder="María González"
                    type="text"
                    {...register("name", { required: true, pattern: /^[^\s]+(?:\s[^\s]+)+$/ })}
                  />
                  {errors.name && errors.name.type === "required" && (
                    <span className="invalid-feedback">Campo obligatorio</span>
                  )}
                  {errors.name && errors.name.type === "pattern" && (
                    <span className="invalid-feedback">El campo debe contener mínimo 2 palabras</span>
                  )}
                </div>

                <div className="form-group mb-1">
                  <label htmlFor="username">Nombre de usuario</label>
                  <input
                    id="username"
                    className={`form-control ${errors.username ? "is-invalid" : ""}`}
                    placeholder="MaríaG"
                    type="text"
                    {...register("username", { required: true, minLength: 2, maxLength: 20 })}
                  />
                  {errors.username && errors.username.type === "required" && (
                    <span className="invalid-feedback">Campo obligatorio</span>
                  )}
                  {errors.username && errors.username.type === "minLength" && (
                    <span className="invalid-feedback">El campo debe contener mínimo 2 letras</span>
                  )}
                  {errors.username && errors.username.type === "maxLength" && (
                    <span className="invalid-feedback">El campo puede contener un máximo de 20 letras</span>
                  )}
                  {errors.username && errors.username.type === "custom" && (
                    <span className="text-danger">{errors.username.message}</span>
                  )}
                </div>

                <div className="form-group mb-1">
                  <label htmlFor="email">Correo electrónico</label>
                  <input
                    id="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="maria.gonzalez@gmail.com"
                    type="text"
                    {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                  />
                  {errors.email && errors.email.type === "required" && (
                    <span className="invalid-feedback">Campo obligatorio</span>
                  )}
                  {errors.email && errors.email.type === "pattern" && (
                    <span className="invalid-feedback">Correo no válido</span>
                  )}
                  {errors.email && errors.email.type === "custom" && (
                    <span className="text-danger">{errors.email.message}</span>
                  )}

                </div>

                <div className="form-group mb-1">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    id="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    type="password"
                    {...register("password", { required: true, minLength: 8 })}
                  />
                  {errors.password && errors.password.type === "required" && (
                    <span className="invalid-feedback">Campo obligatorio</span>
                  )}
                  {errors.password && errors.password.type === "minLength" && (
                    <span className="invalid-feedback">Mínimo 8 caracteres</span>
                  )}
                </div>

                <div className="form-group mb-1">
                  <label htmlFor="password2">Repite la contraseña</label>
                  <input
                    id="password2"
                    className={`form-control ${errors.password2 ? "is-invalid" : ""}`}
                    type="password"
                    {...register("password2", {
                      required: true,
                      minLength: 8,
                      validate: (value) => value === password || "Las contraseñas no coinciden"
                    })}
                  />
                  {errors.password2 && errors.password2.type === "required" && (
                    <span className="invalid-feedback">Campo obligatorio</span>
                  )}
                  {errors.password2 && errors.password2.type === "minLength" && (
                    <span className="invalid-feedback">Mínimo 8 caracteres</span>
                  )}
                  {errors.password2 && errors.password2.type === "validate" && (
                    <span className="invalid-feedback">{errors.password2.message}</span>
                  )}
                </div>

                <div className="form-group text-center">
                  <button type="submit" className="btn btn-primary btn-block">Registrarse</button>
                </div>
              </form>
            </div>
          </div>
          <div className="text-center mt-3">
            <button className="btn btn-link text-primary" onClick={() => { setSwap(true) }}>
              ¿Ya tienes una cuenta? Inicia sesión aquí
            </button>
          </div>
        </div>
      </div>
    </div>  );
}

export default Register;