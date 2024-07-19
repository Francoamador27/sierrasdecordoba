import React from 'react';
import ListadoSearch from "./ListadoSearch";
import { ButtonSearch } from './search/buttonSearch';
import MapWithMarkers from './maps/MapMultipleMarker';
import BottomNav from './button/selectListoMap';

const ListadoCategory = React.memo(() => {
  return (
    <section  className='list-category-page'>
      <div className='botton-search-categorypage'>

        <h5>Seguir buscando...</h5>
        <ButtonSearch />

      </div>
      <section id='list' className='search-page'>
        <ListadoSearch />
        <div id='map' className='map-search'>
        <MapWithMarkers />
        </div>
      </section>
      <BottomNav/>
    </section>
  );
});

export default ListadoCategory;