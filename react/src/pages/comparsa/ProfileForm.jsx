import React from 'react';
import Layout from '../../components/Layout';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const ProfileForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { success } = useSelector((state) => state.auth);

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Layout>
            <div className='container mt-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-body'>
                                <h2 className='card-title text-center'>Completa tu perfil</h2>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='form-group mb-3'>
                                        <label htmlFor='gender'>Sexo</label>
                                        <select
                                            id='gender'
                                            className={`form-control ${errors.gender ? "is-invalid" : ""}`}
                                            {...register("gender", { required: true })}
                                        >
                                            <option value=''>Selecciona un género</option>
                                            <option value='male'>Masculino</option>
                                            <option value='female'>Femenino</option>
                                            <option value='other'>Otro</option>
                                        </select>
                                        {errors.gender && errors.gender.type === "required" && (
                                            <span className="invalid-feedback">Campo obligatorio</span>
                                        )}
                                    </div>

                                    <div className='form-group mb-3'>
                                        <label htmlFor='description'>Descripción</label>
                                        <textarea
                                            id='description'
                                            className={`form-control ${errors.description ? "is-invalid" : ""}`}
                                            {...register("description", {
                                                required: true,
                                                minLength: 20,
                                                maxLength: 200
                                            })}
                                        />
                                        {errors.description && errors.description.type === "required" && (
                                            <span className="invalid-feedback">Campo obligatorio</span>
                                        )}
                                        {errors.description && errors.description.type === "minLength" && (
                                            <span className="invalid-feedback">El campo debe contener mínimo 20 letras</span>
                                        )}
                                        {errors.description && errors.description.type === "maxLength" && (
                                            <span className="invalid-feedback">El campo puede contener un máximo de 200 letras</span>
                                        )}
                                    </div>

                                    <div className='form-group mb-3'>
                                        <label htmlFor='birthdate'>Fecha de nacimiento</label>
                                        <input
                                            type='date'
                                            id='birthdate'
                                            className={`form-control ${errors.birthdate ? "is-invalid" : ""}`}
                                            {...register("birthdate", { required: true })}
                                        />
                                        {errors.birthdate && errors.birthdate.type === "required" && (
                                            <span className="invalid-feedback">Campo obligatorio</span>
                                        )}
                                    </div>

                                    <div className='form-group mb-3'>
                                        <label htmlFor='gender_preference'>Preferencia de género</label>
                                        <select
                                            id='gender_preference'
                                            className='form-control'
                                            {...register("gender_preference")}
                                        >
                                            <option value=''>Selecciona una preferencia de género</option>
                                            <option value='male'>Masculino</option>
                                            <option value='female'>Femenino</option>
                                            <option value='other'>Otro</option>
                                        </select>
                                    </div>

                                    <div className='form-group mb-3'>
                                        <label htmlFor='bandera'>Bandera a elegir</label>
                                        <select
                                            id='bandera'
                                            className='form-control'
                                            {...register("bandera")}
                                        >
                                            <option value=''>Selecciona una preferencia de Bandera</option>
                                            <option value='male'>Masculino</option>
                                            <option value='female'>Femenino</option>
                                            <option value='other'>Otro</option>
                                        </select>
                                    </div>

                                    <div className='form-group mb-3'>
                                        <label htmlFor='profile_picture'>Foto de perfil</label>
                                        <input
                                            type='file'
                                            id='profile_picture'
                                            className={`form-control ${errors.profile_picture ? "is-invalid" : ""}`}
                                            {...register("profile_picture")}
                                        />
                                        {errors.profile_picture && (
                                            <span className="invalid-feedback">Por favor selecciona una imagen válida</span>
                                        )}
                                    </div>

                                    {success && (
                                        <div className='alert alert-success'>
                                            Se han aplicado los cambios correctamente
                                        </div>
                                    )}
                                    <div className='form-group text-center'>
                                        <button type='submit' className='btn btn-primary btn-block'>Aplicar cambios</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProfileForm;
