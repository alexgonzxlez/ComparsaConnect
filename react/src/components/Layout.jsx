import Header from './Header';
import { Container } from 'react-bootstrap'
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div id='page-top'>
            <Header />
            <Container>{children}</Container>
            <Footer />
        </div>
    )
}

export default Layout;