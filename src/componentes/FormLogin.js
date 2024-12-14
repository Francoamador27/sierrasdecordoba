import axios from "axios";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addUser } from "../redux/userSlice";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { sanitizeEmail, sanitizePassword } from "./utils.js/sanitize";
import { url } from "./utils.js/endpoint/endpoint";

export const FormLogin = () => {
  const dispatch = useDispatch();
  const [captchaToken, setCaptchaToken] = useState(null);
  const reCaptchaRef = useRef(null); // Referencia para reiniciar el reCAPTCHA

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

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!captchaToken) {
      return Swal.fire({
        title: "¡Error!",
        text: "Por favor, completa el reCAPTCHA.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }

    try {
      const email = await sanitizeEmail(event.target.email.value);
      const password = await sanitizePassword(event.target.password.value);

      Toast.fire({
        icon: "info",
        title: "Iniciando sesión...",
      });

      const res = await axios.post(
        `${url}/auth/login`,
        { email, password, token: captchaToken },
        { withCredentials: true }
      );

      if (res.data) {
        dispatch(addUser(res.data.user));
        Swal.fire({
          title: "¡Éxito!",
          text: "Has iniciado sesión.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else {
        throw new Error("Usuario o contraseña incorrecta.");
      }
    } catch (error) {
      Swal.fire({
        title: "¡Error!",
        text: "Hubo un problema al procesar la solicitud.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      console.error("Error al procesar la solicitud:", error);

      // Reinicia el reCAPTCHA tras un error
      if (reCaptchaRef.current) {
        reCaptchaRef.current.reset();
      }
      setCaptchaToken(null); // Limpia el estado del token
    }
  };

  return (
    <>
      <div className="container-login">
        <form className="form-log" onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className="input-group">
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="bi bi-envelope-at"></i>
              </span>
            </div>
            <input
              type="text"
              name="email"
              placeholder="email"
              className="form-control input_pass"
            />
          </div>
          <div className="input-group">
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="bi bi-key"></i>
              </span>
            </div>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="form-control input_pass"
            />
          </div>

          {/* Agregar reCAPTCHA v2 visible */}
          <div className="contenedor-recaptcha">
            <ReCAPTCHA
              sitekey="6LcwvjcqAAAAAKXjL0CHiKhPE_cbMMjI-pXx57yZ" // Reemplaza con tu clave pública
              onChange={(token) => setCaptchaToken(token)} // Actualiza el token cuando el usuario lo complete
              onExpired={() => setCaptchaToken(null)} // Maneja el vencimiento del token
              ref={reCaptchaRef} // Referencia para reiniciar el captcha
            />

          </div>

          <div className="buttons">
            <button type="submit" className="btn btn-primary btn-form">
              Ingresar
            </button>

          </div>

          <span>Si no tienes cuenta, puedes crearte una </span>
          <Link to={"/register"}>aquí</Link>
        </form>
      </div>
    </>
  );
};
