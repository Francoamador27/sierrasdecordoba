import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const DataSession = () => {
  const session = useSelector((state) => state.user);
  const userLogged = session && session.email !== null && session.email.trim() !== '';

  return (
    <section className="logged  perfil-page">
      {userLogged ? (
        <>
          <h2>Hola {session.firstName} esta es tu cuenta</h2>
          <p>Nombre: {session.firstName}</p>
          <p>Email: {session.email}</p>
          {session.role === 'user' && (
            <>
              <p>¡Puedes hacerte premium y así podrás publicar!</p>
              <div className="contactarme">
                <h3>Contactate para hacerte premium</h3>
                <Link to={''}>Contactarme</Link>

              </div>
            </>
          )}
          {session.role === 'admin' && (
            <>
              <p>Eres admin</p>

              <p>Rol: {session.role}</p> {/* Corregido a session.role */}
            </>
          )}
          {session.role === 'premium' && (
            <>
              <p>Eres admin</p>

              <p>Rol: {session.role}</p> {/* Corregido a session.role */}
            </>
          )}
        </>
      ) : (
        // Puedes añadir algo para mostrar si el usuario no está logeado
        <p>No estás logeado</p>
      )}
    </section>
  )
}