import React, { useEffect } from 'react';
import Layout from '../../../components/Layout';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, delProfile, profileForm } from '../../../slices/comparsa/thunks';

const Profile = ({ userData, form }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(profileForm())
        if (userData.profile) {
            setValue('gender', userData.profile.gender);
            setValue('description', userData.profile.description);
            setValue('birthdate', userData.profile.birthdate);
            setValue('gender_pref', userData.profile.gender_pref);
            setValue('bandera', userData.profile.bandera);
            // setValue('upload', userData.profile.upload);
        }

    }, []);

    const onSubmit = (data) => {
        const jsonData = {
            gender: data.gender,
            description: data.description,
            birthdate: data.birthdate,
            gender_pref: data.gender_pref,
            bandera: data.bandera,
            upload: data.upload[0]
        };
        console.log(jsonData)
        dispatch(updateProfile(jsonData));
    };
    const handleDelProfile = () => {
        dispatch(delProfile())
    }

    return (
        <Layout>
            <div className=''>
                <h2>Perfil</h2>
                <form className="table" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div className="table-row">
                        <div className="table-cell">
                            <label htmlFor="gender">Sexo</label>
                        </div>
                        <div className="table-cell mb-3">
                            <select id="gender" className={`form-control ${errors.gender ? "is-invalid" : ""}`} {...register("gender", { required: true })}>
                                <option value="">Selecciona un género</option>
                                {form.genders.map(gender => (
                                    <option key={gender.id} value={gender.id}>{gender.name}</option>
                                ))}
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
                                maxLength: 200
                            })}
                        />
                        {errors.description && errors.description.type === "required" && (
                            <span className="invalid-feedback">Campo obligatorio</span>
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
                            readOnly disabled
                        />
                        {errors.birthdate && errors.birthdate.type === "required" && (
                            <span className="invalid-feedback">Campo obligatorio</span>
                        )}
                    </div>

                    <div className="table-row mb-3">
                        <div className="table-cell">
                            <label htmlFor="gender_pref">Preferencia de género</label>
                        </div>
                        <div className="table-cell">
                            <select id="gender_pref" className={`form-control ${errors.birthdate ? "is-invalid" : ""}`}
                                {...register("gender_pref", { required: true })}>
                                <option value="">Selecciona una preferencia de género</option>
                                {form.genders.map(gender => (
                                    <option key={gender.id} value={gender.id}>{gender.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='form-group mb-3'>
                        <label htmlFor='bandera'>Bandera a elegir</label>
                        <select
                            id='bandera'
                            className={`form-control ${errors.birthdate ? "is-invalid" : ""}`}
                            {...register("bandera", { required: true })}
                        >
                            <option value=''>Selecciona una preferencia de Bandera</option>
                            {form.banderas.map(bandera => (
                                <option key={bandera.id} value={bandera.id}>{bandera.name}</option>
                            ))}
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
                    <div className='text-center '>
                        <button type='submit' className='btn btn-secondary me-2'>Aplicar cambios</button>
                        <button className='btn btn-danger me-2' onClick={handleDelProfile}>Eliminar perfil</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default Profile;
