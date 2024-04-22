import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Register = ({ setSwap }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState("");

  const onSubmit = (data) => {
    if ((data.password === data.password2)) {
      console.log("Nombre: " + data.user)
      console.log("Email: " + data.mail)
      console.log("Contraseña: " + data.password)
      navigate("/");
    } else {
      setRegisterError("Las contraseñas no coinciden");
    }
  };


  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Registro</h3>
          <hr />

          <div>
            <label>Nombre completo</label>
            <input
              id="name"
              placeholder="Ingresa tu nombre completo"
              type="text"
              {...register("name", { required: true })}
            />
            {errors.name && errors.name.type === "required" && (
              <span>Campo obligatorio</span>
            )}
          </div>

          <div>
            <label>Correo electronico</label>
            <input
              id="mail"
              placeholder="Ingresa tu correo electronico"
              type="text"
              {...register("mail", { required: true })}
            />
            {errors.mail && errors.mail.type === "required" && (
              <span>Campo obligatorio</span>
            )}
          </div>

          <div>
            <label>Contraseña</label>
            <input
              id="password"
              placeholder="Ingresa tu contraseña"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && errors.password.type === "required" && (
              <span>Campo obligatorio</span>
            )}
          </div>

          <div>
            <label>Repite la contraseña</label>
            <input
              id="password2"
              placeholder="Ingresa tu contraseña"
              type="password"
              {...register("password2", { required: true })}
            />
            {errors.password2 && errors.password2.type === "required" && (
              <span>Campo obligatorio</span>
            )}
          </div>

          {registerError && (
            <div>
              <span>{registerError}</span>
            </div>
          )}

          <div>
            <input type="submit" />
          </div>

          <button onClick={() => { navigate("/login") }}><p>¿Ya tienes una cuenta? Inicia sesion aquí</p></button>
        </form>
      </div>
    </>
  );
}

export default Register;