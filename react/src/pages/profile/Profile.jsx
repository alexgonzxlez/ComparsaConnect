import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, delProfile } from '../../slices/profile/thunks';
import Button from 'react-bootstrap/Button';
import { Plus } from 'react-bootstrap-icons';
import './Profile.css';

const Profile = () => {
    const { register, handleSubmit, setValue, getValues, formState: { errors }, watch } = useForm();
    const dispatch = useDispatch();
    const [currentImage, setCurrentImage] = useState(null);
    const watchUpload = watch("upload");
    const { userData } = useSelector(state => state.auth);
    const { profile, form } = useSelector(state => state.profile);
    const [selectedGenderName, setSelectedGenderName] = useState('');
    const [selectedBanderaName, setSelectedBanderaName] = useState('');
    const [isGenderPrefDisabled, setIsGenderPrefDisabled] = useState(false);


    useEffect(() => {
        if (profile) {
            setValue('gender', profile.gender.id);
            setValue('description', profile.description);
            setValue('birthdate', profile.birthdate);
            setValue('gender_pref', profile.gender_pref);
            setValue('bandera', profile.bandera.id);
            // setValue('upload', profile.upload);
        }

    }, []);

    useEffect(() => {
        if (watchUpload) {
            setCurrentImage(watchUpload[0]);
        }
    }, [watchUpload]);

    console.log(profile)
    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('gender', data.gender);
        formData.append('description', data.description);
        formData.append('birthdate', data.birthdate);
        formData.append('gender_pref', data.gender_pref);
        formData.append('bandera', data.bandera);
        if (data.upload.length > 0) {
            formData.append('upload', data.upload[0]);
        }
        dispatch(updateProfile(formData, userData.id));
    };

    const handleDelProfile = () => {
        dispatch(delProfile())
    }
    const calculateAge = (birthdate) => {
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
            console.log("entra")
            setValue('gender_pref', 1);  
            setIsGenderPrefDisabled(true);
        } else {
            setIsGenderPrefDisabled(false);
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
                    <h2>Perfil</h2>
                    <form className="table" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                        <div className="form-group mb-3">
                            <label htmlFor="gender">Identidad de genero</label>
                            <select id="gender" className={`form-control ${errors.gender ? "is-invalid" : ""}`} {...register("gender", { required: true })}>
                                {form.genders.map(gender => (
                                    <option key={gender.id} value={gender.id}>{gender.name}</option>
                                ))}
                            </select>
                            {errors.gender && errors.gender.type === "required" && (
                                <span className="invalid-feedback">Campo obligatorio</span>
                            )}
                        </div>

                        <div className='form-group mb-3'>
                            <label htmlFor='description'>Descripción sobre ti</label>
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

                        <div className="form-group mb-3">
                            <label htmlFor="gender_pref">Preferencia en cuanto a género</label>
                            <select id="gender_pref" className={`form-control ${errors.gender_pref ? "is-invalid" : ""}`}
                                {...register("gender_pref", { required: true })} disabled={isGenderPrefDisabled}>
                                {form.genders.map(gender => (
                                    <option key={gender.id} value={gender.id}>{gender.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className='form-group mb-3'>
                            <label htmlFor='bandera'>Preferencia a la hora de elegir una bandera</label>
                            <select
                                id='bandera'
                                className={`form-control ${errors.bandera ? "is-invalid" : ""}`}
                                {...register("bandera", { required: true })}
                            >
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
                            <button type='button' className='btn btn-danger me-2' onClick={handleDelProfile}>Eliminar perfil</button>
                        </div>
                    </form>
                </div>
                <div className='col-md-4'>
                    <div className="profile--cards">
                        <div className="profile--card" data-user-id={profile.id}>
                            {currentImage ? (
                                <img src={URL.createObjectURL(currentImage)} alt="Imagen actual" className='img-fluid' />
                            ) : (
                                <img src={profile.file ? `${process.env.API_STORAGE}${profile.file.filepath}` : ''} alt={profile.name} />
                            )}
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

export default Profile;