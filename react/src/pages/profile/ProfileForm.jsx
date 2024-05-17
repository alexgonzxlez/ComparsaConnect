import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { createProfile } from '../../slices/profile/thunks';

const ProfileForm = () => {
    const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm();
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.auth);
    const { form } = useSelector(state => state.profile);
    const [currentImage, setCurrentImage] = useState(null);
    const watchUpload = watch("upload");
    const [selectedGenderName, setSelectedGenderName] = useState('');
    const [selectedBanderaName, setSelectedBanderaName] = useState('');
    const [isGenderPrefDisabled, setIsGenderPrefDisabled] = useState(false);

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

    useEffect(() => {
        if (watchUpload) {
            setCurrentImage(watchUpload[0]);
        }
    }, [watchUpload]);

    const calculateAge = (birthdate) => {
        if (!birthdate) {
            return ''
        }
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    const watchGender = watch('gender');
    const watchBandera = watch('bandera');

    useEffect(() => {
        let number = parseInt(watch('gender'));
        if (number) {
            const selected = form.genders.find(gender => gender.id === number);
            setSelectedGenderName(selected)
        }
        if (number === 1) {
            setValue('gender_pref', 1);  
            setIsGenderPrefDisabled(true);
        } else {
            setIsGenderPrefDisabled(false);
            setValue('gender_pref', null);
        }
    }, [watchGender]);

    useEffect(() => {
        let number = parseInt(watch('bandera'));
        if (number) {
            const selected = form.banderas.find(bandera => bandera.id === number);
            setSelectedBanderaName(selected)
        }
    }, [watchBandera]);


    return (
        <Layout>
            <div className='row'>
                <div className='col-md-8'>
                    <h2>Crear perfil</h2>
                    <form className="table" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                        <div className="form-group mb-3">
                            <label htmlFor="gender">¿Cómo te identificas?</label>
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

                        <div className='form-group mb-3'>
                            <label htmlFor='description'>Cuéntanos sobre ti</label>
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
                            />
                            {errors.birthdate && errors.birthdate.type === "required" && (
                                <span className="invalid-feedback">Campo obligatorio</span>
                            )}
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="gender_pref">¿Tienes alguna preferencia en cuanto a género?</label>
                            <select id="gender_pref" className={`form-control ${errors.birthdate ? "is-invalid" : ""}`}
                                {...register("gender_pref", { required: true })} disabled={isGenderPrefDisabled}>
                                <option value="">Selecciona una preferencia de género</option>
                                {form.genders.map(gender => (
                                    <option key={gender.id} value={gender.id}>{gender.name}</option>
                                ))}
                            </select>
                            {errors.gender_pref && errors.gender_pref.type === "required" && (
                                <span className="invalid-feedback">Campo obligatorio</span>
                            )}

                        </div>

                        <div className='form-group mb-3'>
                            <label htmlFor='bandera'>¿Tienes alguna preferencia a la hora de elegir una bandera?</label>
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
                            {errors.bandera && errors.bandera.type === "required" && (
                                <span className="invalid-feedback">Campo obligatorio</span>
                            )}

                        </div>

                        <div className='form-group mb-3'>
                            <label htmlFor='upload'>Foto de perfil</label>
                            <input
                                type='file'
                                id='upload'
                                className={`form-control ${errors.upload ? "is-invalid" : ""}`}
                                {...register("upload", { required: true })}
                            />
                            {errors.upload && (
                                <span className="invalid-feedback">Por favor selecciona una imagen válida</span>
                            )}
                        </div>
                        <div className='form-group text-center'>
                            <button type='submit' className='btn btn-primary btn-block'>Crear perfil</button>
                        </div>
                    </form>
                </div>
                <div className='col-md-4'>
                    <div className="profile--cards">
                        <div className="profile--card">
                            {currentImage &&
                                <img src={URL.createObjectURL(currentImage)} alt="Imagen actual" className='img-fluid' />
                            }
                            <h3>{userData && userData.name}</h3>
                            <p>{selectedGenderName && selectedGenderName.name} {' - '} {calculateAge(watch('birthdate'))}</p>
                            <p>{selectedBanderaName && selectedBanderaName.name}</p>
                            <p>{watch('description')}</p>
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    );
}

export default ProfileForm;