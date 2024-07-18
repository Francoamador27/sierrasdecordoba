import { Link } from "react-router-dom";
import '../css/Footer.css'
function Footer(){
return(
    <footer>
        <hr></hr>
    <nav>
        <p>Descubre la magia de Córdoba: historia, naturaleza y aventura en cada rincón.Todo en un solo sitio</p>
        <ul>
            <li ><Link to="/">Home</Link></li>
            <li ><Link to="/list">List</Link></li>
        </ul>
    </nav>

</footer>
);
}

export default Footer;