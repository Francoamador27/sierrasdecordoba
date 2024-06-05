import { useDispatch } from "react-redux";
import Navbarmain from "./Navbar";
import { addUser, cleanUser } from "../redux/userSlice";
import axios from "axios";
import { useEffect } from "react";

function Header (props){
    const {favs} = props;
 

return(
    <header>
        <Navbarmain favs={favs}/>
    </header>
    
    )   
}

export default Header;