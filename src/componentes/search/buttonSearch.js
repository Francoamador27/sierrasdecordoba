import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../css/filter.css'
import { url } from "../utils.js/endpoint/endpoint";
import { fetchUbicaciones } from "../utils.js/fetchs/getUbicacion";
import { useSelector } from "react-redux";

export const ButtonSearch = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
    const initialRegions = useSelector(state => state.ubicaciones);

  const [regionesCordoba, setRegionesCordoba] = useState(useSelector(state => state.ubicaciones));
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState('');
  const [ciudades, setCiudades] = useState([]);



  useEffect(() => {
    // Este efecto se ejecuta solo una vez al montar el componente
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
    const sanitizedValue = value.replace(/\s+/g, "-"); // Elimina los espacios en blanco
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
    const searchUrl = `/propiedades?${queryString}`;
    navigate(searchUrl);
    handleClose();
  };

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
          <Modal.Title>Filtros</Modal.Title>
        </Modal.Header>
        <form className="search-form" onSubmit={handleSubmit}>
          <Modal.Body>
            <label htmlFor="palabra_clave">Buscar por palabra clave (opcional):</label>
            <input type="search" className="search-field" placeholder="Buscar propiedades..." value={formData.palabra_clave} name="palabra_clave" onChange={handleChange} />
            <input type="category" className="category" hidden placeholder="Buscar propiedades..." value='alquiler-temporal' name="category" onChange={handleChange} />

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

            <div className="wrapper">
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
            </div>
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