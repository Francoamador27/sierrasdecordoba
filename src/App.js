import './css/variables.css'
import './css/app.css'
// COMPONENTS
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { Rutas } from './componentes/rutas/Rutas';
import { fetchUbiAlojamientos, fetchUbiTours } from './componentes/utils.js/fetchs/getUbicacion';
import { useDispatch, useSelector } from 'react-redux';
import { setubicaciones } from './redux/ubicacionesSlice';
import { Loading } from './componentes/Loading';
import { LoadingHome } from './componentes/Loading/LoadingHome';
import { setubiTours } from './redux/ubiToursSlice';
function App() {
  const [favs, setFavs] = useState([]);
  const dispatch = useDispatch();
  const [ready, setReady] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const ubiAlojamientos = await fetchUbiAlojamientos();
      const ubicacionesTours = await fetchUbiTours();
      if (ubiAlojamientos) {
        dispatch(setubicaciones(ubiAlojamientos));
        
        setReady(false);
      }
      if (ubicacionesTours) {
        dispatch(setubiTours(ubicacionesTours));
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
      {ready ? (
        <LoadingHome/>
      ) : (<>
        <Header favs={favs} />
        <div className='principal'>

          <div className='rutas'>
            <Rutas />
          </div>

        </div>
        <Footer />
      </>
      )}
    </>
  );
}

export default App;
