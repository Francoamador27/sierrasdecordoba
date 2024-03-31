import { useDispatch } from "react-redux";
import Navbarmain from "./Navbar";
import { addUser, cleanUser } from "../redux/userSlice";
import axios from "axios";
import { useEffect } from "react";

function Header (props){
    const {favs} = props;
    const dispatch = useDispatch()
  useEffect(() => {
      const fetchSession = async () => {
        try {
          const res = await axios.get('http://localhost:5000/api/sessions/show', { withCredentials: true });
          const user = res.data.user;
          if(user){
            dispatch(addUser(user))
          }else{
            dispatch(cleanUser())
          }
        } catch (error) {
          dispatch(cleanUser())
          console.error('Error al procesar la solicitud:', error);
        }
      };
      fetchSession();
  }, [dispatch]);

return(
    <header>
        <Navbarmain favs={favs}/>
    </header>
    
    )   
}

export default Header;