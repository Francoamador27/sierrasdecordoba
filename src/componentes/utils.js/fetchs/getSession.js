import { url } from "../endpoint/endpoint"

export const getSession = async (parametro) => {

    
  
    const endPointSession = `/api/sessions/show`;
    try {
      const response = await fetch(endPointSession, {
        method: 'GET',
        credentials: 'include', // Asegúrate de incluir las credenciales
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const apiSession = await response.json();
      return apiSession;
    } catch (error) {
   return ;

    }
  };  