import { url } from "../endpoint/endpoint";

export const getUsers = async (parametro) => {
    const endPoint = `/api/users/`;
    try {
      const response = await fetch(endPoint, {
        method: 'GET',
        credentials: 'include', // Asegúrate de incluir las credenciales
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const apiData = await response.json();
      return apiData.data;
    } catch (error) {
   return ;

    }
  };    
  
