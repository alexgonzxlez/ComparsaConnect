import React from 'react';
import Layout from './Layout';

const NotFound = () => {
    return (
        <Layout>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="text-center mt-5">
                            <h1 className="display-4">404</h1>
                            <p className="lead">¡Ups! Parece que te has perdido.</p>
                            <p className="lead">La página que buscas no existe.</p>
                            <p className="lead">Pero no te preocupes, puedes volver a nuestro <a href="/" className="text-primary">inicio</a>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default NotFound;
