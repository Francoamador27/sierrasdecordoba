export const fetchGallery = async (formData) => {
    try {
      const response = await fetch('/api/products/galeria', {
        method: 'POST',
        body: prepareFormData(formData),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        responseData.data.id = responseData.data._id;
        const data = responseData.data;
        data.id = responseData.data._id;
        return data;
      } else {
        return;
      }
    } catch (error) {
      return { status: 'error', data: null };
    }
  };
  
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