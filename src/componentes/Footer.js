import { Link } from "react-router-dom";
import '../css/Footer.css'
function Footer(){
return(
    <footer>
    <nav>
        <h5>Todos los derechos reservados</h5>
        <ul>
            <li ><Link to="/">Home</Link></li>
            <li ><Link to="/list">List</Link></li>
        </ul>
    </nav>

</footer>
);
}

export default Footer;