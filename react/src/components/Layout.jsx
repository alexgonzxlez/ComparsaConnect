import Header from './Header';
import { Container } from 'react-bootstrap'
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main>
                <Container>{children}</Container>
            </main>
            <Footer />
        </>
    )
}

export default Layout;