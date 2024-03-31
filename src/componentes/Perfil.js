import { useSelector } from "react-redux";

export const DataSession =() =>{
    const session = useSelector((state)=> state.user);
    const userLogged  = session && session.email !== null && session.email.trim() !== '';

    return (
        <>
        {userLogged ? (
          <>
            <h2>Logeado</h2>
            <p>Nombre: {session.firstName}</p>
            <p>Email: {session.email}</p>
            <p>Rol: {session.role}</p> {/* Corregido a session.role */}
          </>
        ) : (
          // Puedes añadir algo para mostrar si el usuario no está logeado
          <p>No estás logeado</p>
        )}
      </>
    )
}