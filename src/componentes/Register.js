import { Link, useNavigate } from "react-router-dom";
import { sanitizeEmail, sanitizePassword } from "./utils.js/sanitize";
import { addUser } from "../redux/userSlice";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import axios from "axios";

export function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleRegister = async (event) => {
    event.preventDefault();
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
    try {
      const email =  await sanitizeEmail(event.target.email.value);
      const password = await sanitizePassword(event.target.password.value);   
      const firstName = await event.target.firstName.value;   
      const lastName = await event.target.lastName.value;   
      Toast.fire({
        icon: "info",
        title: "logging"
      });
      const res = await axios.post('http://localhost:5000/auth/register', {firstName,lastName, email, password }, { withCredentials: true });
      if(res.data){
        dispatch(addUser(res.data.user))
        Swal.fire({
          title: '¡Éxito!',
          text: 'Has iniciado sesion',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        navigate("/login");
        
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

  return (
    <>
      <div class="container-login">
        <form class="form-log" action="" onSubmit={handleRegister} method="post" >
          <h2>Registrarse</h2>
          <div className="input-group mb-3">
            <div className="input-group-append">
              <span className="input-group-text"><i className="bi bi-person-circle"></i></span>
            </div>
            <input type="text" name="firstName" placeholder="firstName" className="form-control input_user" />
          </div>
          <div className="input-group mb-2">
            <div className="input-group-append">
              <span className="input-group-text"><i className="bi bi-person-bounding-box"></i></span>
            </div>
            <input type="text" name="lastName" placeholder="lastName" className="form-control input_pass" />
          </div>
          <div className="input-group mb-2">
            <div className="input-group-append">
              <span className="input-group-text"><i className="bi bi-envelope-at"></i></span>
            </div>
            <input type="text" name="email" placeholder="email" className="form-control input_pass" />
          </div>
          <div className="input-group mb-2">
            <div className="input-group-append">
              <span className="input-group-text"><i className="bi bi-key"></i></span>
            </div>
            <input id="password" type="text" name="password" placeholder="password" className="form-control input_pass" />
          </div>
          <div className="input-group mb-2">
            <div className="input-group-append">
              <span className="input-group-text"><i className="bi bi-key"></i></span>
            </div>
            <input id="rep-password" type="text" name="rep-password" placeholder="repetir password" className="form-control input_pass" />
          </div>
          <div className="buttons">
            <button type="submit" className="btn btn-primary btn-form">Registrarse</button>

            <button type="button" className="btn btn-primary btn-aux"><a href="/login">Login </a></button>
          </div>
        </form>
      </div>
    </>
  )
}