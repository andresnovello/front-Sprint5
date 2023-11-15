import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";

const Header: React.FC = () => {
    // Utils
    const navigate = useNavigate();    
    const isLoggedIn: boolean = useIsLoggedIn();
    // Handlers
    function onLogOut() {
        window.localStorage.removeItem('token');
        navigate('/');
    }
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand onClick={() => navigate('/')}>El Buen Sabor</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
                            <NavDropdown title="Catalogo" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Hamburgesas</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Pizzas</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Bebidas
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Administracion" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => navigate('/clientes')}>Clientes</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate('/empleados')}>Empleados</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate('/productos')}>Productos</NavDropdown.Item>
                            </NavDropdown>
                            
                            
                            {!isLoggedIn && <Nav.Link onClick={() => navigate('/login')}>Log In</Nav.Link>}

                            {!isLoggedIn && <Nav.Link onClick={() => navigate('/register')}>Registrar</Nav.Link>}

                            {isLoggedIn && <Nav.Link onClick={onLogOut}>Log Out</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Header;