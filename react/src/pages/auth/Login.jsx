import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { doLogin } from '../../slices/auth/thunks';

const Login = ({ setSwap }) => {
  const { register, handleSubmit, setError,setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error,isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      setError('username');
      setError('password');
      setValue('username', '');
      setValue('password', '');
    }
  }, [error, setValue, setError]);

  const onSubmit = (data) => {
    dispatch(doLogin({ username: data.username, password: data.password, rememberMe: data.rememberMe }));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Inicio de sesión</h3>
              <hr />

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-1">
                  <label htmlFor="username">Usuario o email</label>
                  <input
                    id="username"
                    className={`form-control ${errors.username ? "is-invalid" : ""}`}
                    placeholder="Ingresa tu nombre de usuario o correo electrónico"
                    type="text"
                    {...register("username", { required: true })}
                  />
                  {errors.username && errors.username.type === "required" && (
                    <span className="invalid-feedback">Campo obligatorio</span>
                  )}
                </div>

                <div className="form-group mb-1">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    id="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    placeholder="Ingresa tu contraseña"
                    type="password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && errors.password.type === "required" && (
                    <span className="invalid-feedback">Campo obligatorio</span>
                  )}
                </div>

                <div className="form-group mb-1 form-check">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="form-check-input"
                    {...register("rememberMe")}
                  />
                  <label htmlFor="rememberMe" className="form-check-label">Recuérdame</label>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="form-group text-center">
                <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                    {isLoading ? "Cargando..." : "Iniciar sesión"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="text-center mt-3">
            <button className="btn btn-link text-primary" onClick={() => { setSwap(false) }}>
              ¿No tienes una cuenta? Regístrate aquí
            </button>
          </div>
        </div>
      </div >
    </div >
  );
}

export default Login;
