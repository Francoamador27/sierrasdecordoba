import { url } from "../endpoint/endpoint";

export const getAllProducts = async (params) => {
  let endPoint = `/api/products`;
  console.log("endPoint",endPoint)
  if (params) {
    let queryParams = '';

    if (params.maxPrice) {
      queryParams += `maxPrice=${params.maxPrice}&`;
    }
    if (params.category) {
      queryParams += `category=${params.category}&`;
    }
    if (params.limit) {
      queryParams += `limit=${params.limit}&`;
    }
    if (params.page) {
      queryParams += `page=${params.page}&`;
    }
    if (params.order) {
      queryParams += `order=${params.order}&`;
    }

    if (queryParams) {
      queryParams = '?' + queryParams.slice(0, -1);
      endPoint += queryParams;
    }
  }
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
      console.error('Error al obtener los productos:', error);
throw "Error";    }
  };
