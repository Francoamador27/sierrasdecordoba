export const RegionesCordoba = [
  {
    "departamento": "Córdoba",
    "ciudades": ["Capital"]
  },
  {
    "departamento": "Punilla",
    "ciudades": ["Villa Carlos Paz",
      "La Falda",
      "Cosquín",
      "Capilla del Monte",
      "Bialet Massé",
      "Huerta Grande",
      "Valle Hermoso",
      "Villa Giardino",
      "La Cumbre",
      "Villa Santa Cruz del Lago",
      "Villa Parque Síquiman",
      "Santa María de Punilla",
      "San Antonio de Arredondo",
      "Tanti",
      "Villa Icho Cruz",
      "San Roque",
      "Mayu Sumaj",
      "Estancia Vieja",
      "Los Cocos",
      "San Esteban",
      "Villa Rio Icho Cruz",
      "Villa del Lago",
      "Villa Lago Azul",
      "Villa Lago San Roque",
      "Villa Ciudad Parque Los Reartes",
      "Villa San Nicolás"]
  },
  {
    "departamento": "Calamuchita",
    "ciudades": ["Villa General Belgrano", "Santa Rosa de Calamuchita", "La Cumbrecita", "Los Reartes"]
  },
  {
    "departamento": "Colón",
    "ciudades": ["Colonia Caroya", "Jesús María", "Salsipuedes", "La Calera"]
  },
  {
    "departamento": "Cruz del Eje",
    "ciudades": ["Cruz del Eje", "Villa de Soto", "Serrezuela", "San Marcos Sierras"]
  },
  {
    "departamento": "General Roca",
    "ciudades": ["Villa Huidobro", "Villa Sarmiento", "Italó", "Villa Valeria"]
  },
  {
    "departamento": "General San Martín",
    "ciudades": ["Villa María", "Villa Nueva", "Morrison", "Arroyo Cabral"]
  },
  {
    "departamento": "Ischilín",
    "ciudades": ["Deán Funes", "Quilino", "San José de las Salinas", "Charbonier"]
  },
  {
    "departamento": "Juárez Celman",
    "ciudades": ["La Carlota", "General Cabrera", "Santa Eufemia", "Ucacha"]
  },
  {
    "departamento": "Marcos Juárez",
    "ciudades": ["Marcos Juárez", "Arias", "Corral de Bustos", "Leones"]
  },
  {
    "departamento": "Presidente Roque Sáenz Peña",
    "ciudades": ["Laboulaye", "General Levalle", "Serrano", "Rosales"]
  },
  {
    "departamento": "Río Cuarto",
    "ciudades": ["Río Cuarto", "Las Higueras", "Berrotarán", "Holmberg"]
  },
  {
    "departamento": "Río Primero",
    "ciudades": ["Río Primero", "Monte Cristo", "La Para", "Capilla de los Remedios"]
  },
  {
    "departamento": "Río Segundo",
    "ciudades": ["Río Segundo", "Luque", "Oncativo", "Manfredi"]
  },
  {
    "departamento": "San Alberto",
    "ciudades": ["Mina Clavero", "Nono", "Los Hornillos", "Las Rabonas"]
  },
  {
    "departamento": "San Javier",
    "ciudades": ["Villa Dolores", "Villa de las Rosas", "Las Tapias", "La Paz"]
  },
  {
    "departamento": "San Justo",
    "ciudades": ["San Francisco", "Las Varillas", "Arroyito", "Balnearia"]
  },
  {
    "departamento": "Santa María",
    "ciudades": ["Anisacate", "Alta Gracia", "Villa La Bolsa", "Despeñaderos"]
  },
  {
    "departamento": "Tercero Arriba",
    "ciudades": ["Río Tercero", "Villa Ascasubi", "Almafuerte", "Embalse"]
  },
  {
    "departamento": "Totoral",
    "ciudades": ["Villa del Totoral", "Sinsacate", "Villa Santa Rosa", "Villa Cerro Azul"]
  },
  {
    "departamento": "Tulumba",
    "ciudades": ["Villa Tulumba", "San José de la Dormida", "Villa Tulumba", "Villa de San Miguel"]
  },
  {
    "departamento": "Unión",
    "ciudades": ["Bell Ville", "Morrison", "Monte Leña", "Cintra"]
  }
]

export const SelectCiudades = ({ ciudades, onSelectCiudad,valorInicial }) => (
  <select value={valorInicial} onChange={(e) => onSelectCiudad(e.target.value)}>
    <option value="">Seleccionar Ciudad</option>
    {ciudades.map((ciudad, index) => (
      <option key={index} value={ciudad}>{ciudad}</option>
    ))}
  </select>
);

export const SelectDepartamentos = ({ departamentos, onSelectDepartamento,valorInicial }) => (
  <select value={valorInicial} onChange={(e) => onSelectDepartamento(e.target.value)}>
    <option value="">Seleccionar Departamento</option>
    {departamentos.map((departamento, index) => (
      <option key={index} value={departamento.departamento}>{departamento.departamento}</option>
    ))}
  </select>
);