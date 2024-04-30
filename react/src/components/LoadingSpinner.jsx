import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Layout from './Layout';

const LoadingSpinner = () => {
  return (
    <Layout>
      <div className="text-center mt-4">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Cargando información...</p>
      </div>
    </Layout>
  );
};

export default LoadingSpinner;