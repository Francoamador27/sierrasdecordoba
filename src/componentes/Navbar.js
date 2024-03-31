import '../css/navbar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Search from './Search';
import { NavDropdown } from 'react-bootstrap';
import { Unlog } from './Unlog';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function Navbarmain(props) {
  const session = useSelector((state)=> state.user);
  const [userLogged, setUserLogged] = useState();
  useEffect(()=>{
    setUserLogged(session && session.email !== null && session.email.trim() !== '');
    
  },[session])

  return (
    <Navbar expand="lg" className="bg-body-tertiary ">
      <Container>
        <Navbar.Brand ><Link to="/">Cbaprop</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/propiedades?category=venta-de-terreno">Terrenos en Venta</Link>             
            <Link to="/propiedades?category=alquiler-temporal">Alquiler Temporal</Link>             
            <NavDropdown title={<>Perfil</>} id="basic-nav-dropdown">
            {userLogged ? (
              <Link to="/login">{(<>Perfil</>)}</Link>
            
              ):(
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
                <Unlog/>
              </NavDropdown.Item>

              }
            </NavDropdown>    
          </Nav>
          <Search/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarmain;