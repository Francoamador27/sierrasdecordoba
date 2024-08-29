import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Button } from 'react-bootstrap';
import { url } from '../utils.js/endpoint/endpoint';
import { useSelector } from 'react-redux';
import { fetchPutPass } from '../utils.js/fetchs/fetchPutPass';
import Swal from "sweetalert2";

export function UpdatePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const session = useSelector((state) => state.user);
console.log(session)
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
  
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;
  
    if (!validatePassword(newPassword)) {
      alert('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.');
      return;
    }
  
    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
  
    // Desactivar botón de envío para prevenir envíos múltiples
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
  
    //crear el fecth para actualizar la contraseña
    const updatePassword = async (newPassword, session, url, submitButton) => {
        try {
          const response = await fetchPutPass(newPassword, session, url, submitButton)
          const data = await response.json();

          if(data){
            if(data.status ==  "updated"){
              Swal.fire({
                title: '¡Éxito!',
                text: 'Se ha creado con éxito',
                icon: 'success',
                confirmButtonText: 'Aceptar',
              })}else{
                Swal.fire({
                  title: '¡Error!',
                  text: 'No se pudo actualizar la password',
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                });
              }
          }else{
              Swal.fire({
                title: '¡Error!',
                text: 'No se pudo actualizar la password',
                icon: 'error',
                confirmButtonText: 'Aceptar',
              });
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Error de red al intentar actualizar la contraseña');
          submitButton.disabled = false; // Rehabilitar el botón en caso de error
        }
      };
      updatePassword(newPassword, session, url, submitButton);
     
        
  };

  return (
    <Accordion defaultActiveKey="0" flush>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Actualizar contraseña</Accordion.Header>
        <Accordion.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 d-flex align-items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                placeholder="Nueva contraseña"
                className="form-control"
              />
              <Button
                variant="link"
                onClick={togglePasswordVisibility}
                className="change-type"
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </Button>
            </div>
            <div className="mb-3 d-flex align-items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                className="form-control"
              />
              <Button
                variant="link"
                onClick={togglePasswordVisibility}
                className="change-type"
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </Button>
            </div>
            <Button type="submit" id='changePassword' variant="primary">
              Actualizar
            </Button>
          </form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}