import { Link, useNavigate } from "react-router-dom";
import { sanitizeEmail, sanitizePassword } from "./utils.js/sanitize";
import { addUser } from "../redux/userSlice";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import axios from "axios";
import { url } from "./utils.js/endpoint/endpoint";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";

export function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [captchaToken, setCaptchaToken] = useState(null); // Estado para almacenar el token del captcha
  const recaptchaRef = useRef(null); // Referencia para el ReCAPTCHA
  
  const handleRegister = async (event) => {
    event.preventDefault();
  
    // Validación del reCAPTCHA
    if (!captchaToken) {
      return Swal.fire({
        title: "¡Error!",
        text: "Por favor, completa el reCAPTCHA.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  
    // Validación de contraseñas
    const password = event.target.password.value;
    const repPassword = event.target["rep-password"].value;
  
    if (password !== repPassword) {
      // Resetea el captcha si las contraseñas no coinciden
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setCaptchaToken(null);
      }
      return Swal.fire({
        title: "¡Error!",
        text: "Las contraseñas no coinciden. Por favor, verifica e intenta nuevamente.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
  
    try {
      const email = await sanitizeEmail(event.target.email.value);
      const sanitizedPassword = await sanitizePassword(password);
      const firstName = event.target.firstName.value;
      const lastName = event.target.lastName.value;
  
      Toast.fire({
        icon: "info",
        title: "Registrando...",
      });
  
      const res = await axios.post(
        `${url}/auth/register`,
        { firstName, lastName, email, password: sanitizedPassword, token: captchaToken },
        { withCredentials: true }
      );
  
      if (res.data) {
        dispatch(addUser(res.data.user));
        Swal.fire({
          title: "¡Éxito!",
          text: "Te has registrado exitosamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        navigate("/login");
      } else {
        Swal.fire({
          title: "¡Error!",
          text: "Hubo un problema con el registro.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "¡Error!",
        text: "Hubo un problema al procesar la solicitud.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } finally {
      // Resetea el reCAPTCHA al final, independientemente de si hay error o éxito
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setCaptchaToken(null);
      }
    }
  };
  return (
    <>
      <div className="container-login">
        <form className="form-log" onSubmit={handleRegister}>
          <h2>Registrarse</h2>
          <div className="input-group mb-3">
            <div className="input-group-append">
              <span className="input-group-text"><i className="bi bi-person-circle"></i></span>
            </div>
            <input type="text" name="firstName" placeholder="Nombre" className="form-control input_user" />
          </div>
          <div className="input-group mb-2">
            <div className="input-group-append">
              <span className="input-group-text"><i className="bi bi-person-bounding-box"></i></span>
            </div>
            <input type="text" name="lastName" placeholder="Apellido" className="form-control input_pass" />
          </div>
          <div className="input-group mb-2">
            <div className="input-group-append">
              <span className="input-group-text"><i className="bi bi-envelope-at"></i></span>
            </div>
            <input type="text" name="email" placeholder="Email" className="form-control input_pass" />
          </div>
          <div className="input-group mb-2">
            <div className="input-group-append">
              <span className="input-group-text"><i className="bi bi-key"></i></span>
            </div>
            <input id="password" type="password" name="password" placeholder="Contraseña" className="form-control input_pass" />
          </div>
          <div className="input-group mb-2">
            <div className="input-group-append">
              <span className="input-group-text"><i className="bi bi-key"></i></span>
            </div>
            <input id="rep-password" type="password" name="rep-password" placeholder="Repetir contraseña" className="form-control input_pass" />
          </div>
          <div className="contenedor-recaptcha">

          <ReCAPTCHA
            ref={recaptchaRef} // Asigna la referencia
            sitekey="6LcwvjcqAAAAAKXjL0CHiKhPE_cbMMjI-pXx57yZ" // Reemplaza con tu clave pública
            onChange={(token) => setCaptchaToken(token)} // Actualiza el token cuando el usuario lo complete
            onExpired={() => setCaptchaToken(null)} // Maneja el vencimiento del token
          />
          </div>
          <div className="buttons">
            <button type="submit" className="btn btn-primary btn-form">Registrarse</button>
          </div>
          
          <span>¿Ya tienes cuenta? Puedes loguearte </span>
          <Link to={"/login"}>aquí</Link>
        </form>
      </div>
    </>
  );
}
