import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';

const Home = () => {
  return (
    <>
    <Header/>
        <header className="masthead text-center text-white">
          <div className="masthead-content">
            <div className="container px-5">
              <h1 className="masthead-heading mb-0">ComparsaConnect</h1>
              <h2 className="masthead-subheading mb-0">Will Rock Your Socks Off</h2>
              <a className="btn btn-primary btn-xl rounded-pill mt-5" href="#scroll">Comienza ya</a>
            </div>
          </div>
          <div className="bg-circle-1 bg-circle"></div>
          <div className="bg-circle-2 bg-circle"></div>
          <div className="bg-circle-3 bg-circle"></div>
          <div className="bg-circle-4 bg-circle"></div>
        </header>
    </>
  );
};

export default Home;
