import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function Results (){
    let token = sessionStorage.getItem('token');

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let keyword = queryParams.get('keyword');
    let page = queryParams.get('page');
    if(!page){
            page='1';
    }
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(page);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(()=>{

        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=0da31fbe1e952b303732503e58454149&language=es-Es&query=${keyword}&page=${currentPage}`;
    axios.get(endPoint)
    .then(results => {
        const apiData = results.data;
        setCurrentPage(apiData.page); 
         setResults(apiData.results);
        setTotalPages(apiData.total_pages);
    })
    .catch(error =>{
        Swal.fire(
         {   title: "Oops",
            text:"Hubo un error inesperado"
        }
        )
    })
    },[keyword,currentPage])
    const handlePageChange = (direction) => {
        const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
        // Verifica que la nueva página esté dentro del rango de páginas totales
        if (newPage > 0 && newPage <= totalPages) {
          setCurrentPage(newPage);
          queryParams.set('page', newPage);
          window.location.search = queryParams.toString();
        }
      };
    return(
        <>
        {!token && <Navigate to='/' />}
        <h2>Resultados de búsqueda para "{keyword}"</h2>
        {results.length > 0 ? (
          <div className="row">
            {results.map((movie, idx) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-4" key={idx}>
                <div className="card" >
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{movie.title.length > 20 ? `${movie.title.slice(0, 20)}...` : movie.title}</h5>
                    <p className="card-text">{movie.overview.length > 150 ? `${movie.overview.slice(0, 150)}...` : movie.overview}</p>

                    {/* Puedes ajustar el enlace según tus necesidades */}
                    <Link to={`/details?id=${movie.id}`} className="btn btn-primary">Ver Más</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No se encontraron resultados.</p>
        )}
        <div className="pagination">
          <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>Anterior</button>
          <span>{currentPage} de {totalPages}</span>
          <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>Siguiente</button>
        </div>
      </>)
}

export default Results;