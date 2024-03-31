import axios from "axios";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addUser } from "../redux/userSlice";
import { Link } from "react-router-dom";
import { sanitizeEmail, sanitizePassword } from "./utils.js/sanitize";

export const FormLogin = ()=>{
    const dispatch = useDispatch()
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
          const email =  await sanitizeEmail(event.target.email.value);
          const password = await sanitizePassword(event.target.password.value);   
          Toast.fire({
            icon: "info",
            title: "logging"
          });
          const res = await axios.post('http://localhost:5000/auth/login', { email, password }, { withCredentials: true });
          if(res.data){
            dispatch(addUser(res.data.user))
            Swal.fire({
              title: '¡Éxito!',
              text: 'Has iniciado sesion',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            });
          }else{
            Swal.fire({
              title: '¡Error!',
              text: 'Usuario o contraseña incorrecta.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          }
          
        } catch (error) {
          Swal.fire({
            title: '¡Error!',
            text: error,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          console.error('Error al procesar la solicitud:', error);
        }
      };


return(
    <>
        <div className="container-login">
                <form className="form-log" onSubmit={handleLogin}>
                <h2>Login</h2>
                  <div className="input-group ">
                    <div className="input-group-append">
                      <span className="input-group-text"><i className="bi bi-envelope-at"></i></span>
                    </div>
                    <input type="text" name="email" placeholder="email" className="form-control input_pass"/> 
                  </div>        
                  <div className="input-group ">
                    <div className="input-group-append">
                      <span className="input-group-text"><i className="bi bi-key"></i></span>
                    </div>
                              <input type="text" name="password" placeholder="password" className="form-control input_pass"/> 
                  </div>
                 <div className="buttons">
                  <button type="submit" className="btn btn-primary btn-form">Ingresar</button>

                  <button type="button" className="btn btn-primary btn-aux"><Link to={"/register"}>Register </Link></button>
                 </div>
                </form>
                </div>

                </>
)
}