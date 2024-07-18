import { url } from "../endpoint/endpoint";

export async function deleteUser(id) {
    const endPoint = `${url}/api/users/${id}`;
    try {
      const response = await fetch(endPoint, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error de red: ${response.status}`);
      }
  
      const userDeleted = await response.json();
      return userDeleted;
    } catch (error) {
      console.error('Error en la solicitud DELETE', error);
      throw error; // Re-lanzamos el error para que el llamador pueda manejarlo si es necesario
    }
  }