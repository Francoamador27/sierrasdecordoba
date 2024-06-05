import { url } from "../endpoint/endpoint";

export async function fetchImageDelete(id, image) {
  const endPoint = `/api/products/image/${id}/${image}`;
  try {
    const response = await fetch(endPoint, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error de red: ${response.status}`);
    }

    const imageDeleted = await response.json();
    return imageDeleted;
  } catch (error) {
    console.error('Error en la solicitud DELETE', error);
    throw error; // Re-lanzamos el error para que el llamador pueda manejarlo si es necesario
  }
}