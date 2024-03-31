export const getMyProducts = async (parametro) => {
        const endPoint = 'http://localhost:5000/api/products/myProducts?limit=10';
        try {
          const response = await fetch(endPoint, {
            method: 'GET',
            credentials: 'include', // Asegúrate de incluir las credenciales
          });
  
          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          const apiData = await response.json();
          return apiData.data.products;
        } catch (error) {
       return ;
  
        }
      };    
      