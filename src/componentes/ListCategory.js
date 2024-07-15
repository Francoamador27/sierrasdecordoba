import React from 'react';
import ListadoSearch from "./ListadoSearch";
import { ButtonSearch } from './search/buttonSearch';
import MapWithMarkers from './maps/MapMultipleMarker';
import { buscarCoordenadasPorDepartamento } from './utils.js/deptos';

const ListadoCategory = React.memo(() => {
  return (
    <section className='list-category-page'>
      <div className='botton-search-categorypage'>

        <h5>Seguir buscando...</h5>
        <ButtonSearch />

      </div>
      <section className='search-page'>
        <ListadoSearch />
        <div className='map-search'>
        <MapWithMarkers />
        </div>
      </section>
    </section>
  );
});

export default ListadoCategory;