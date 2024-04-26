import React from 'react';
import Layout from '../../components/Layout';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { createProfile } from '../../slices/comparsa/thunks';

const ProfileForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { error, success } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('gender', data.gender);
        formData.append('description', data.description);
        formData.append('birthdate', data.birthdate);
        formData.append('gender_pref', data.gender_pref);
        formData.append('bandera', data.bandera);
        formData.append('upload', data.upload[0]);
    
        dispatch(createProfile(formData))
    };

    return (
        <Layout>
            <div className=''>
                <h2>Más Info</h2>
                <form className="table" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div className="table-row">
                        <div className="table-cell">
                            <label htmlFor="gender">Sexo</label>
                        </div>
                        <div className="table-cell">
                            <select id="gender" className={`form-control ${errors.gender ? "is-invalid" : ""}`} {...register("gender", { required: true })}>
                                <option value="">Selecciona un género</option>
                                <option value="1">Masculino</option>
                                <option value="2">Femenino</option>
                                <option value="3">Otro</option>
                            </select>
                            {errors.gender && errors.gender.type === "required" && (
                                <span className="invalid-feedback">Campo obligatorio</span>
                            )}
                        </div>
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

                    <div className="table-row">
                        <div className="table-cell">
                            <label htmlFor="gender_pref">Preferencia de género</label>
                        </div>
                        <div className="table-cell">
                            <select id="gender_pref" className="form-control" {...register("gender_pref")}>
                                <option value="">Selecciona una preferencia de género</option>
                                <option value="1">Masculino</option>
                                <option value="2">Femenino</option>
                                <option value="3">Otro</option>
                            </select>
                        </div>
                    </div>

                    <div className='form-group mb-3'>
                        <label htmlFor='bandera'>Bandera a elegir</label>
                        <select
                            id='bandera'
                            className='form-control'
                            {...register("bandera")}
                        >
                            <option value=''>Selecciona una preferencia de Bandera</option>
                            <option value='1'>Masculino</option>
                            <option value='2'>Femenino</option>
                            <option value='3'>Otro</option>
                        </select>
                    </div>

                    <div className='form-group mb-3'>
                        <label htmlFor='upload'>Foto de perfil</label>
                        <input
                            type='file'
                            id='upload'
                            className={`form-control ${errors.upload ? "is-invalid" : ""}`}
                            {...register("upload")}
                        />
                        {errors.upload && (
                            <span className="invalid-feedback">Por favor selecciona una imagen válida</span>
                        )}
                    </div>

                    {success && (
                        <div className='alert alert-success'>
                            Se han aplicado los cambios correctamente
                        </div>
                    )}
                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}
                    <div className='form-group text-center'>
                        <button type='submit' className='btn btn-primary btn-block'>Aplicar cambios</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default ProfileForm;