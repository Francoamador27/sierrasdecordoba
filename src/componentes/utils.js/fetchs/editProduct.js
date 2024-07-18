import { url } from "../endpoint/endpoint";

const prepareFormData = (formData) => {

  const data = new FormData();
  for (const key in formData) {
    if (formData.hasOwnProperty(key) && key !== 'thumbnail') {
      data.append(key, formData[key]);
    }
  }
    formData.thumbnail.forEach((thumbnail, index) => {
    data.append(`thumbnail`, thumbnail);  // No se necesita [index], FormData manejará el índice automáticamente
  });

  return data;
};

export const fetchEdit = async (formData,id) => {
    try {
      console.log("data en el endpoint",prepareFormData(formData))
            const response = await fetch(`${url}/api/products/${id}` , {
        method: 'PUT',
        body: prepareFormData(formData),
      });
      if (response.ok) {
        const responseData = await response.json(); 
       let data = responseData.product;
        return data;
    } else {
          return ;
        }
    } catch (error) {
        return {status: "error",data: null};
       
    }
  };