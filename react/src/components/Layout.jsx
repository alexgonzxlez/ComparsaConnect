import Header from './Header';
import { Container } from 'react-bootstrap'
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div id='page-top'>
            <Header />
            <div className="container mt-2">
            <Container>{children}</Container>
            </div>
            <Footer />
        </div>
    )
}

export default Layout;