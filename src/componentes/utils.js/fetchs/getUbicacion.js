import { url } from "../endpoint/endpoint";

export const fetchUbiAlojamientos = async () => {
    let endPoint = `${url}/api/products/ubicacion?category=alquiler-temporal`;
    try {
      const response = await fetch(endPoint, {
        method: 'GET',
        credentials: 'include', // Asegúrate de incluir las credenciales
      });

      if (!response.ok) {
        return null;
      }

      const apiData = await response.json();
      return(apiData.data); // Asume que apiData.data es el array de ubicaciones
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

export const fetchUbiTours = async () => {
    let endPoint = `${url}/api/products/ubicacion?category=tours`;
    try {
      const response = await fetch(endPoint, {
        method: 'GET',
        credentials: 'include', // Asegúrate de incluir las credenciales
      });

      if (!response.ok) {
        return null;
      }

      const apiData = await response.json();
      return(apiData.data); // Asume que apiData.data es el array de ubicaciones
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };