import React, { useEffect, useState } from 'react';
import Hammer from 'hammerjs';
import './Comparsas.css';
import 'font-awesome/css/font-awesome.min.css';
import Header from '../../components/Header';
import { getSuitors, match, rejectMatch } from '../../slices/match/thunks';
import { useSelector, useDispatch } from 'react-redux';
import Heart from './Heart';

const Comparsa = () => {
    const { suitors, page, heart } = useSelector(state => state.match);
    const [actionTaken, setActionTaken] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSuitors())
    }, [page]);

    useEffect(() => {
        setActionTaken(false);
    }, [suitors]);

    const handleMatch = (id) => {
        setActionTaken(true);
        dispatch(match(id))
    }
    console.log(suitors)

    useEffect(() => {
        const tinderContainer = document.querySelector('.tinder');
        const allCards = document.querySelectorAll('.tinder--card');
        const nope = document.getElementById('nope');
        const love = document.getElementById('love');

        function initCards() {
            const newCards = document.querySelectorAll('.tinder--card:not(.removed)');

            newCards.forEach((card, index) => {
                card.style.zIndex = allCards.length - index;
                card.style.transform = `scale(${(20 - index) / 20}) translateY(-${30 * index}px)`;
                card.style.opacity = (10 - index) / 10;
            });

            tinderContainer.classList.add('loaded');
        }

        initCards();

        allCards.forEach((el) => {
            const hammertime = new Hammer(el);

            hammertime.on('pan', (event) => {
                el.classList.add('moving');
            });

            hammertime.on('pan', (event) => {
                if (event.deltaX === 0) return;
                if (event.center.x === 0 && event.center.y === 0) return;
                tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
                tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

                const xMulti = event.deltaX * 0.03;
                const yMulti = event.deltaY / 80;
                const rotate = xMulti * yMulti;

                event.target.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
            });

            hammertime.on('panend', (event) => {
                el.classList.remove('moving');
                tinderContainer.classList.remove('tinder_love');
                tinderContainer.classList.remove('tinder_nope');

                const moveOutWidth = document.body.clientWidth;
                const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

                event.target.classList.toggle('removed', !keep);
                let userId = null

                if (keep) {
                    event.target.style.transform = '';
                } else {
                    const endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
                    const toX = event.deltaX > 0 ? endX : -endX;
                    const endY = Math.abs(event.velocityY) * moveOutWidth;
                    const toY = event.deltaY > 0 ? endY : -endY;
                    const xMulti = event.deltaX * 0.03;
                    const yMulti = event.deltaY / 80;
                    const rotate = xMulti * yMulti;

                    event.target.style.transform = `translate(${toX}px, ${toY + event.deltaY}px) rotate(${rotate}deg)`;
                    const userId = el.getAttribute('data-user-id');
                    if (!actionTaken) { 
                        if (event.deltaX > 0) {
                            // ACCION DE LIKE EN DESPLAZAMIENTO A LA DERECHA
                            handleMatch(userId);
                        } else {
                            // ACCION DE RECHAZAR EN DESPLAZAMIENTO A LA IZQUIERDA
                            dispatch(rejectMatch(userId));
                            console.log("RECHAZAR " + userId);
                        }
                        setActionTaken(true);
                        initCards();
                    }
                }
            });
        });

        function createButtonListener(love) {
            return function (event) {
                const cards = document.querySelectorAll('.tinder--card:not(.removed)');
                const moveOutWidth = document.body.clientWidth * 1.5;

                if (!cards.length) return false;

                const card = cards[0];

                card.classList.add('removed');
                const userId = card.getAttribute('data-user-id');

                if (love) {
                    // ACCION DE LIKE EN BOTON
                    card.style.transform = `translate(${moveOutWidth}px, -100px) rotate(-30deg)`;
                    handleMatch(userId)
                    setActionTaken(true);
                } else {
                    // ACCION DE DISLIKE EN BOTON
                    card.style.transform = `translate(-${moveOutWidth}px, -100px) rotate(30deg)`;
                    dispatch(rejectMatch(userId))
                    console.log("discard")
                }

                initCards();

                event.preventDefault();
            };
        }

        const nopeListener = createButtonListener(false);
        const loveListener = createButtonListener(true);

        nope.addEventListener('click', nopeListener);
        love.addEventListener('click', loveListener);

        return () => {
            nope.removeEventListener('click', nopeListener);
            love.removeEventListener('click', loveListener);
        };
    }, [suitors]);

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
    return (
        <>
            <Header />
            {heart && <Heart />}
            <div className="tinder">
                <div className="tinder--status">
                    <i className="fa fa-remove"></i>
                    <i className="fa fa-heart"></i>
                </div>

                <div className="tinder--cards">
                    {suitors && suitors.length > 0 ? (
                        suitors.map((suitor) => (
                            <div key={suitor.id} className="tinder--card" data-user-id={suitor.user.id}>
                                <img src={process.env.API_STORAGE + suitor.file.filepath} alt={suitor.user.name} />
                                <h3>{suitor.user.name}</h3>
                                <p>{suitor.gender.name} - {calculateAge(suitor.birthdate)}</p>
                                <p>{suitor.bandera.name}</p>
                                <p>{suitor.description}</p>
                            </div>
                        ))
                    ) : (
                        <div className="">
                            No hay más usuarios disponibles.
                        </div>
                    )}
                </div>

                <div className="tinder--buttons">
                    <button id="nope"><i className="fa fa-remove"></i></button>
                    <button id="love"><i className="fa fa-heart"></i></button>
                </div>
            </div>
        </>
    );
};

export default Comparsa;