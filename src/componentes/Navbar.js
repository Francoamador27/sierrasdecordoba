import '../css/navbar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import Search from './Search';
import { NavDropdown } from 'react-bootstrap';
import { Unlog } from './Unlog';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faPersonHiking } from '@fortawesome/free-solid-svg-icons';

function Navbarmain(props) {
  const session = useSelector((state) => state.user);
  const pathname =useLocation().pathname;
  const [userLogged, setUserLogged] = useState();
  useEffect(() => {
    setUserLogged(session && session.email !== null && session.email.trim() !== '');

  }, [session])

  return (
    <Navbar expand="lg" className="bg-body-tertiary ">
      <Container>
        <Navbar.Brand ><Link to="/" className='logo-frase'><img src='/logohorizontal.png' className='logo'/><p></p></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/propiedades" className={`button-class ${pathname === '/propiedades' ? 'active-button' : ''}`}><i className="bi bi-house-door"></i>Alojamientos</Link>
            <Link to="/tours" className={`button-class ${pathname === '/tours' ? 'active-button' : ''}`}><FontAwesomeIcon icon={faPersonHiking} /> Actividades</Link>
            <Link to="/restaurantes" className={`button-class ${pathname === '/restaurantes' ? 'active-button' : ''}`}>      <FontAwesomeIcon icon={faUtensils} aria-hidden="true" /> Restaurantes</Link>

          </Nav>
      
          <NavDropdown title={<><i className="bi bi-person-circle"></i>Perfil</>} id="basic-nav-dropdown">
            {userLogged ? (
              <Link to="/login">{(<>Perfil</>)}</Link>

            ) : (
              <Link to="/login">{(<>Login</>)}</Link>

            )
            }
            {userLogged &&
              <Link to="/myproducts">Mis publicaciones</Link>}
            {userLogged &&
              <Link to="/createproducts">Crear Publicación</Link>}
            <NavDropdown.Divider />
            {userLogged &&
              <NavDropdown.Item >
                <Unlog />
              </NavDropdown.Item>

            }
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarmain;