import React from 'react';
import ListadoSearch from "./ListadoSearch";
import { ButtonSearch } from './search/buttonSearch';

const ListadoCategory = React.memo(() => {
  return (
    <>
      <ButtonSearch />

      <section className='search-page'>
        <ListadoSearch />
        <div className='map-search'>
          MAPA
        </div>
      </section>
    </>
  );
});

export default ListadoCategory;