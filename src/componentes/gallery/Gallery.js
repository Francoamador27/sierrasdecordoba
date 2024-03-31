import React from 'react';
import GalleryCarousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css'; // Importa los estilos (asegúrate de que la ruta sea correcta)

export const MiGaleriaCarousel = (images) => {

  return <GalleryCarousel images={images} />;
};

