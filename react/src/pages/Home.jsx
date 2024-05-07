import React from 'react';
import Header from '../components/Header';
import image1 from '../assets/img/01.jpg'; 
import image2 from '../assets/img/02.jpg'; 
import image3 from '../assets/img/03.jpg'; 
const Home = () => {
  return (
    <>
      <Header/>
      <header className="masthead text-center text-white">
          <div className="masthead-content">
            <div className="container px-5">
              <h1 className="masthead-heading mb-0">Comparsa Connect</h1>
              <h2 className="masthead-subheading mb-0">Encuentra tu compañero/a para las Comparsas 2024</h2>
              <a className="btn btn-primary btn-xl rounded-pill mt-5" href="#scroll">¡Comienza ahora!</a>
            </div>
          </div>
          <div className="bg-circle-1 bg-circle"></div>
          <div className="bg-circle-2 bg-circle"></div>
          <div className="bg-circle-3 bg-circle"></div>
          <div className="bg-circle-4 bg-circle"></div>
      </header>
        <section id="scroll">
            <div className="container px-5">
                <div className="row gx-5 align-items-center">
                    <div className="col-lg-6 order-lg-2">
                        <div className="p-5"><img className="img-fluid rounded-circle" src={image1} alt="Pareja bailando en Comparsas" /></div>
                    </div>
                    <div className="col-lg-6 order-lg-1">
                        <div className="p-5">
                            <h2 className="display-4">¡Encuentra tu pareja para saltar!</h2>
                            <p>Descubre a alguien con quien compartir la emoción y la diversión de las Comparsas. Con Comparsa Connect, encontrarás a tu compañero/a ideal para disfrutar al máximo de estas festividades.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div className="container px-5">
                <div className="row gx-5 align-items-center">
                    <div className="col-lg-6">
                        <div className="p-5"><img className="img-fluid rounded-circle" src={image2} alt="Grupo de amigos en las Comparsas" /></div>
                    </div>
                    <div className="col-lg-6">
                        <div className="p-5">
                            <h2 className="display-4">¡Únete a la diversión en grupo!</h2>
                            <p>Conoce nuevos amigos con los que compartir risas y momentos especiales en las Comparsas. Comparsa Connect te permite conectarte con personas que comparten tus intereses y disfrutar juntos de estas festividades.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div className="container px-5">
                <div className="row gx-5 align-items-center">
                    <div className="col-lg-6 order-lg-2">
                        <div className="p-5"><img className="img-fluid rounded-circle" src={image3} alt="Persona disfrutando de las Comparsas" /></div>
                    </div>
                    <div className="col-lg-6 order-lg-1">
                        <div className="p-5">
                            <h2 className="display-4">¡Vive la emoción de las Comparsas!</h2>
                            <p>Sumérgete en la magia de las Comparsas y vive experiencias inolvidables junto a tu compañero/a ideal. Comparsa Connect te ayuda a encontrar a esa persona especial con la que disfrutar de momentos llenos de alegría y diversión.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </>
  );
};

export default Home;
