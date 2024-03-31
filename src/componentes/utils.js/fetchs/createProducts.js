const createFormData = (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    return formData;
  };

export const fetchCreate = async (formData) => {
    try {
      const response = await fetch('/api/products/', {
        method: 'POST',
        body: createFormData(formData),
      });
      if (response.ok) {
        const responseData = await response.json(); // Parsea la respuesta como JSON
        responseData.data.id = responseData.data._id;
        const data = responseData.data
        data.id = responseData.data._id;
   
        return data;
    } else {
          return ;
        }
    } catch (error) {
        return {status: "error",data: null};
       
    }
  };