import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Layout from '../../components/Layout';

const Comparsas = () => {
    const swiperRef = useRef(null);

    const handleSwipe = () => {
        swiperRef.current.swiper.slideNext();
    };

    const usuarios = [
        { id: 1, nombre: "Usuario 1", imagen: "usuario1.jpg" },
        { id: 2, nombre: "Usuario 2", imagen: "usuario2.jpg" },
        { id: 3, nombre: "Usuario 3", imagen: "usuario3.jpg" }
    ];

    return (
        <Layout>
            <div className="comparsa-container">
                <Swiper
                    className="swiper"
                    ref={swiperRef}
                    spaceBetween={20}
                    slidesPerView={1}
                >
                    {usuarios.map((usuario) => (
                        <SwiperSlide key={usuario.id} className="swiper-slide">
                            <div className="card">
                                {/* Contenido del usuario */}
                                <img src={usuario.imagen} className="card-img-top" alt={usuario.nombre} />
                                <div className="card-body">
                                    <h5 className="card-title">{usuario.nombre}</h5>
                                    <div className="buttons-container">
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-danger btn-sm" onClick={() => handleSwipe('left')}>Rechazar</button>
                            <button className="btn btn-success btn-sm" onClick={() => handleSwipe('right')}>Aceptar</button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </Layout>
    );
};

export default Comparsas;
