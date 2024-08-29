import { url } from "../endpoint/endpoint";

export async function getUserById(id) {
    const endPoint = `${url}/api/users/edit/${id}`;
    try {
      const response = await fetch(endPoint, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error de red: ${response.status}`);
      }
  
      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Error en la solicitud DELETE', error);
      throw error; // Re-lanzamos el error para que el llamador pueda manejarlo si es necesario
    }
  }