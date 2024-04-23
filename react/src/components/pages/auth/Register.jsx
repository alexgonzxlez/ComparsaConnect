import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState("");

  const onSubmit = (data) => {
    if ((data.password === data.password2)) {
      console.log("Nombre completo: " + data.name)
      console.log("Nombre de usuario: " + data.username)
      console.log("Email: " + data.mail)
      console.log("Contraseña: " + data.password)
      navigate("/");
    } else {
      setRegisterError("Las contraseñas no coinciden");
    }
  };


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
              {...register("username", { required: true, minLength: 2 })}
            />
            {errors.username && errors.username.type === "required" && (
              <span className="text-danger">Campo obligatorio</span>
            )}
            {errors.username && errors.username.type === "minLength" && (
              <span className="text-danger">El campo debe contener minimo 2 letras</span>
            )}
          </div>

          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              id="mail"
              className={`form-control ${errors.mail ? "border border-danger" : ""}`}
              placeholder="Ej: maria.gonzalez@gmail.com"
              type="text"
              {...register("mail", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
            />
            {errors.mail && errors.mail.type === "required" && (
              <span className="text-danger">Campo obligatorio</span>
            )}
            {errors.mail && errors.mail.type === "pattern" && (
              <span className="text-danger">Correo no valido</span>
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
              {...register("password2", { required: true, minLength: 8 })}
            />
            {errors.password2 && errors.password2.type === "required" && (
              <span className="text-danger">Campo obligatorio</span>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <span className="text-danger">Mínimo 8 caracteres</span>
            )}
          </div>

          {registerError && (
            <div className="text-danger mb-3">
              <span>{registerError}</span>
            </div>
          )}

          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg btn-block">Registrarse</button>
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