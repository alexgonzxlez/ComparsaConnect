import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HeartAnimation.css'; // Archivo de estilos para la animación
import { useDispatch, useSelector } from 'react-redux';
import { setHeart } from '../../slices/match/matchSlice';

const Heart = () => {
    const [hearts, setHearts] = useState([]);
    const { heart } = useSelector(state => state.match);
    const [heartCount, setHeartCount] = useState(0);
    const maxHearts = 12; // Numero de corazones

    const dispatch = useDispatch();

    useEffect(() => {

        const intervalId = setInterval(() => {
            if (heartCount < maxHearts) {
                const newHearts = [...hearts];
                newHearts.push({
                    id: Date.now(),
                    x: Math.random() * window.innerWidth,
                    y: -100, // Comienzan desde arriba
                    animationDuration: 2 + Math.random() * 2 // Duración
                });
                setHearts(newHearts);
                setHeartCount(heartCount + 1);
            } else {
                clearInterval(intervalId); 
                dispatch(setHeart(false))
                 // Ocultar los corazones
            }

        }, 300); // Crea corazones cada 3s

        return () => {
            clearInterval(intervalId);
        };
    }, [hearts, heartCount, heart]);


    return (
        <div className="heart-overlay">
            {hearts.map(heart => (
                <div
                    key={heart.id}
                    className="heart-container"
                    style={{ top: heart.y, left: heart.x, animationDuration: `${heart.animationDuration}s` }}
                >
                    <FontAwesomeIcon icon={faHeart} className="heart-icon" />
                </div>
            ))}
        </div>
    );
}

export default Heart;
