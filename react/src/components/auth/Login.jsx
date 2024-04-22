import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = ({ setSwap }) => {
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
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Inicio de sesión</h3>
          <hr />

          <div>
            <label>Usuario o email</label>
            <input
              id="user"
              placeholder="Ingresa tu nombre de usuario o el correo electronico"
              type="text"
              {...register("user", { required: true })}
            />
            {errors.user && errors.user.type === "required" && (
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

          {loginError && (
            <div>
              <span>{loginError}</span>
            </div>
          )}

          <div>
            <input type="submit" />
          </div>

          <button onClick={() => { navigate("/register") }}><p>¿No tienes una cuenta? Regístrate aquí</p></button>
        </form>
      </div>
    </>
  );
}

export default Login;