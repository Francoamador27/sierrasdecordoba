import './css/variables.css'
import './css/app.css'
// COMPONENTS
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { Rutas } from './componentes/rutas/Rutas';
function App() {

  const [favs, setFavs] = useState([]);
  useEffect(()=>{
      let favMovies = localStorage.getItem('favs');
      if(favMovies != null){
          favMovies =JSON.parse(favMovies)
          setFavs(favMovies)
      }
  },[])

  return (
    <>
      <Header favs={favs} />
        <div className='container principal'>
            <Rutas />
        </div>
      <Footer/>
    </>
  );
}

export default App;
