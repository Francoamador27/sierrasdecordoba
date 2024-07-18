import { url } from "../utils.js/endpoint/endpoint";

export const getEditPage= async (id)=>{
    const endPoint = `${url}/api/products/edit/${id}`;
      try {
        const response = await fetch(endPoint, {
          method: 'GET',
          credentials: 'include',
        });
        const apiData = await response.json();
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return apiData;
    }catch(e){
        throw new Error(`Problemas con la comunicación`);
    }
}