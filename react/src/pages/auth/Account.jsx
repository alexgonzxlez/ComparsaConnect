import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { delUser, updateAccount, user } from '../../slices/auth/thunks';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Account = () => {
    const { token, userData, isLoading } = useSelector(state => state.auth);
    const { register, handleSubmit, setError, formState: { errors }, setValue } = useForm();
    const dispatch = useDispatch();
    const { errs } = useSelector((state) => state.auth);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        dispatch(user(token))
    }, []);

    useEffect(() => {
        if (userData && !isLoading) {
            setValue('name', userData.name);
            setValue('username', userData.username);
            setValue('email', userData.email);
        }
    }, [userData, isLoading, setValue]);

    useEffect(() => {
        if (errs) {
            Object.entries(errs).forEach(([key, errArr]) => {
                errArr.forEach(err => {
                    setError(key, { type: 'custom', message: err })
                });
            });
        }
    }, [errs]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const onSubmit = (data) => {
        console.log(data);
        dispatch(updateAccount({ name: data.name, email: data.email, username: data.username }));
    };

    const handleDelAccount = () => {
        dispatch(delUser())
    }

    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <Layout>
            <div className=''>
                <h2>Cuenta</h2>
                {userData ? (
                    <form className="table" onSubmit={handleSubmit(onSubmit)}>
                        <div className="table-row">
                            <div className="table-cell">
                                <label htmlFor="name">Nombre</label>
                            </div>
                            <div className="table-cell">
                                <input type="text" id="name" className={`form-control ${errors.name ? "is-invalid" : ""}`} {...register("name", { required: true, pattern: /^[^\s]+(?:\s[^\s]+)+$/ })} />
                                {errors.name && errors.name.type === "required" && (
                                    <span className="invalid-feedback">Campo obligatorio</span>
                                )}
                                {errors.name && errors.name.type === "pattern" && (
                                    <span className="invalid-feedback">El campo debe contener mínimo 2 palabras</span>
                                )}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="table-cell">
                                <label htmlFor="username">Nombre de usuario</label>
                            </div>
                            <div className="table-cell">
                                <input type="text" id="username" className={`form-control ${errors.username ? "is-invalid" : ""}`} {...register("username", { required: true, minLength: 2, maxLength: 20 })} />
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
                        </div>
                        <div className="table-row">
                            <div className="table-cell">
                                <label htmlFor="email">Correo electrónico</label>
                            </div>
                            <div className="table-cell">
                                <input type="email" id="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />
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
                        </div>
                        <div className="table-row">
                            <div className="table-cell">
                                <label htmlFor="created_at">Fecha de creación</label>
                            </div>
                            <div className="table-cell">
                                <input type="date" id="created_at" value={formatDate(userData.created_at)} readOnly disabled className="form-control" />
                            </div>
                        </div>
                        <div className="mt-3 text-center">
                            <button type="submit" className="btn btn-primary btn-block me-2">Aplicar cambios</button>
                            <button type="button" className="btn btn-danger me-2" onClick={handleShow}>Eliminar cuenta</button>
                        </div>
                    </form>

                ) : (
                    <p>No hay datos disponibles</p>
                )}
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmación</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Estás seguro de que deseas eliminar tu cuenta?</Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelAccount}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>

        </Layout>
    );
}

export default Account;