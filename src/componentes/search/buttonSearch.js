import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../css/filter.css'
import { useSelector } from "react-redux";

export const ButtonSearch = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const initialRegions = useSelector(state => state.ubicaciones);
  const initialUbiTours = useSelector(state => state.ubiTours);
  const [regionesCordoba, setRegionesCordoba] = useState(useSelector(state => state.ubicaciones));
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState('');
  const [ciudades, setCiudades] = useState([]);

  useEffect(() => {
    setRegionesCordoba(initialRegions);
  }, [initialRegions]); // 

  useEffect(() => {
    const fetchCiudades = async () => {
      const departamento = await regionesCordoba.find(ubicacion => ubicacion.departamento === departamentoSeleccionado);
      setCiudades(departamento.ciudades);
      if (departamento) {
      } else {
        setCiudades([]);
      }
    };

    if (departamentoSeleccionado) {
      fetchCiudades();
    }
  }, [departamentoSeleccionado, regionesCordoba]);

  const [formData, setFormData] = useState({
    palabra_clave: "",
    category: "alquiler-temporal",
    departamento: '',
    ciudad: '',
    precio_min: "",
    precio_max: ""
  });

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    //agregar las regiones segun la categoria seleccionada, si selecciono tours agregar las regiones de los tours
    if(value === 'tours'){
      setRegionesCordoba(initialUbiTours);
    }
    if(value === 'alquiler-temporal'){
      setRegionesCordoba(initialRegions);
    }
    if(value === 'restaurantes'){
      setRegionesCordoba(initialRegions);
    }
    const sanitizedValue = value; 
    setFormData({
      ...formData,
      [name]: sanitizedValue
    });
  };

  const handleSelectDepartamento = (e) => {
    const departamento = e.target.value;
    setDepartamentoSeleccionado(departamento);
    setFormData({
      ...formData,
      departamento: departamento,
      ciudad: '' // Resetea la ciudad cuando se selecciona un nuevo departamento
    });
  };

  const handleSelectCiudad = (e) => {
    const ciudad = e.target.value;
    setFormData({
      ...formData,
      ciudad: ciudad
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const searchParams = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      searchParams.append(key, value);
    });
    const queryString = searchParams.toString();
    if(formData.category === 'tours'){
      var searchUrl = `/tours?${queryString}`;
    }else if(formData.category === 'alquiler-temporal'){
      var searchUrl = `/propiedades?${queryString}`;
    }else{
      var searchUrl = `/restaurantes?${queryString}`;
    }
    navigate(searchUrl);
    handleClose();
  };
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <>
      <Button variant="primary" className="buscador" onClick={handleShow}>
        <div className="boton-filtro">
          <p className="filter-item">Tipo de Propiedad</p>
          <p className="filter-item">Ubicacion</p>
          <p className="filter-item">Filtrar Precio</p>
          <div className="icon-search">
            <i className="bi bi-search"></i>
          </div>
        </div>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Buscador</Modal.Title>
        </Modal.Header>
        <form className="search-form" onSubmit={handleSubmit}>
          {/* Comentario de crear un select para cambiar la categoria en tres opciones , tours, alquiler-temporal y restaurantes */}
          <div>
            <label htmlFor="category">Categorias</label>
            <select id="category" name="category" onChange={handleChange}>
              <option value="alquiler-temporal">Alojamientos</option>
              <option value="tours">Tours</option>
              <option value="restaurantes">Restaurantes</option>
            </select>
          </div>
          {/* Hacer un listadoo de  checkbox para seleccionar una categoria a la vez y que se guarde en el formData con el nombre category*/}
        

          <Modal.Body>
            <label htmlFor="palabra_clave">Buscar por palabra clave (opcional):</label>
            <input type="search" className="search-field" placeholder="Buscar propiedades..." value={formData.palabra_clave} name="palabra_clave" onChange={handleChange} />

            <div>
              <label htmlFor="departamento">Selecciona un departamento de cordoba:</label>
              <select
                id="departamento"
                value={departamentoSeleccionado}
                onChange={handleSelectDepartamento}
              >
                <option value="">Todos</option>
                {regionesCordoba.map((ubicacion, index) => (
                  <option key={index} value={ubicacion.departamento}>
                    {ubicacion.departamento}
                  </option>
                ))}
              </select>
            </div>

            {departamentoSeleccionado && (
              <div>
                <label htmlFor="ciudad">Selecciona una ciudad:</label>
                <select
                  id="ciudad"
                  value={formData.ciudad}
                  onChange={handleSelectCiudad}
                >
                  <option value="">Todos</option>
                  {ciudades.map((ciudad, index) => (
                    <option key={index} value={ciudad}>
                      {ciudad}
                    </option>
                  ))}
                </select>
              </div>
            )}

        {/*    <div className="wrapper">
              <h4>Rango de precio</h4>
              <div className="price-input">
                <div className="field">
                  <span>Min</span>
                  <input type="number" className="input-min" name="precio_min" value={formData.precio_min} onChange={handleChange} />
                </div>
                <div className="separator">--</div>
                <div className="field">
                  <span>Max</span>
                  <input type="number" className="input-max" name="precio_max" value={formData.precio_max} min="0" max="10000000" onChange={handleChange} />
                </div>
              </div>
            </div>*/}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" type="submit">
              Buscar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};