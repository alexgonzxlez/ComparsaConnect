import React, { useEffect } from 'react';
import Hammer from 'hammerjs'; // Asegúrate de haber instalado esta dependencia
import './Comparsas.css';
import 'font-awesome/css/font-awesome.min.css';
import Layout from '../../components/Layout';
import Header from '../../components/Header';

const Comparsa = () => {
    const fakeData = [
        { id: 7, imageUrl: "http://127.0.0.1:8000/storage/uploads/1715099986_03.jpg", title: "Alex Gonzalez", description: "This is a demo for Tinder like swipe cards" },
        { id: 2, imageUrl: "http://127.0.0.1:8000/storage/uploads/1715099986_03.jpg", title: "Demo card 2", description: "This is a demo for Tinder like swipe cards" },
        { id: 3, imageUrl: "http://127.0.0.1:8000/storage/uploads/1715099986_03.jpg", title: "Demo card 3", description: "This is a demo for Tinder like swipe cards" },
        { id: 4, imageUrl: "http://127.0.0.1:8000/storage/uploads/1715099986_03.jpg", title: "Demo card 4", description: "This is a demo for Tinder like swipe cards" },
        { id: 5, imageUrl: "http://127.0.0.1:8000/storage/uploads/1715099986_03.jpg", title: "Demo card 5", description: "This is a demo for Tinder like swipe cards" }
    ];

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
                    if (event.deltaX > 0) {
                        // ACCION DE LIKE EN DESPLAZAMIENTO A LA DERECHA
                        const userId = el.getAttribute('data-user-id');
                        console.log(userId);
                    } else {
                        // ACCION DE LIKE EN DESPLAZAMIENTO A LA IZQUIERDA
                        console.log("DISLIKE");
                    }

                    initCards();
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

                if (love) {
                    // ACCION DE LIKE EN BOTON
                    card.style.transform = `translate(${moveOutWidth}px, -100px) rotate(-30deg)`;
                    const userId = card.getAttribute('data-user-id');
                    console.log(userId)
                } else {
                    // ACCION DE DISLIKE EN BOTON
                    card.style.transform = `translate(-${moveOutWidth}px, -100px) rotate(30deg)`;
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
    }, []);

    return (
        <>
            <Header />
            <div className="tinder">
                <div className="tinder--status">
                    <i className="fa fa-remove"></i>
                    <i className="fa fa-heart"></i>
                </div>

                <div className="tinder--cards">
                    {fakeData.map((card) => (
                        <div key={card.id} className="tinder--card" data-user-id={card.id}>
                            <img src={card.imageUrl} alt={card.title} />
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                        </div>
                    ))}
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