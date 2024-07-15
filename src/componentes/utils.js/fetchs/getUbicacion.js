export const fetchUbicaciones = async () => {
    let endPoint = `/api/products/ubicacion`;
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