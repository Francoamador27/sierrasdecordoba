import './css/variables.css'
import './css/app.css'
// COMPONENTS
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { Rutas } from './componentes/rutas/Rutas';
import { fetchUbicaciones } from './componentes/utils.js/fetchs/getUbicacion';
import { useDispatch, useSelector } from 'react-redux';
import { setubicaciones } from './redux/ubicacionesSlice';
function App() {
  const [favs, setFavs] = useState([]);
  const dispatch = useDispatch();
  const ubicaciones = useSelector(state => state.ubicaciones);

    useEffect(() => {
      const fetchData = async () => {
        const ubicaciones = await fetchUbicaciones();
        if (ubicaciones) {
          dispatch(setubicaciones(ubicaciones));
        }
      };
      fetchData();
    }, []);

  useEffect(() => {

    let favMovies = localStorage.getItem('favs');
    if (favMovies != null) {
      favMovies = JSON.parse(favMovies)
      setFavs(favMovies)
    }
  }, [])

  return (
    <>
      <Header favs={favs} />
      <div className='principal'>

        <div className='rutas'>
          <Rutas />
        </div>

      </div>
      <Footer />
    </>
  );
}

export default App;
