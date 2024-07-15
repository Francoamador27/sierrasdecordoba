export const RegionesCordoba = [
  {
    "departamento": "Córdoba",
    "ciudades": ["Capital"],
    "ubicacion": [-31.4135, -64.18105],
    "imagen" : "cordoba.jpg"

  },
  {
    "departamento": "Punilla",
    "ciudades": [
      "Villa Carlos Paz", "La Falda", "Cosquín", "Capilla del Monte", "Bialet Massé",
      "Huerta Grande", "Valle Hermoso", "Villa Giardino", "La Cumbre", "Villa Santa Cruz del Lago",
      "Villa Parque Síquiman", "Santa María de Punilla", "San Antonio de Arredondo", "Tanti",
      "Villa Icho Cruz", "San Roque", "Mayu Sumaj", "Estancia Vieja", "Los Cocos", "San Esteban",
      "Villa Rio Icho Cruz", "Villa del Lago", "Villa Lago Azul", "Villa Lago San Roque",
      "Villa Ciudad Parque Los Reartes", "Villa San Nicolás"
    ],
    "ubicacion": [-31.2994, -64.4985],
    "imagen" : "punilla.png"
  },
  {
    "departamento": "Calamuchita",
    "ciudades": ["Villa General Belgrano", "Santa Rosa de Calamuchita", "La Cumbrecita", "Los Reartes"],
    "ubicacion": [-32.0464, -64.4995],
    "imagen" : "calamuchita.jpg"
  },
  {
    "departamento": "Colón",
    "ciudades": ["Colonia Caroya", "Jesús María", "Salsipuedes", "La Calera"],
    "ubicacion": [-31.2389, -64.3125]
  },
  {
    "departamento": "Cruz del Eje",
    "ciudades": ["Cruz del Eje", "Villa de Soto", "Serrezuela", "San Marcos Sierras"],
    "ubicacion": [-30.7304, -64.7981],
    "imagen" : "cruz-del-eje.png"

  },
  {
    "departamento": "General Roca",
    "ciudades": ["Villa Huidobro", "Villa Sarmiento", "Italó", "Villa Valeria"],
    "ubicacion": [-34.5885, -64.9311]
  },
  {
    "departamento": "General San Martín",
    "ciudades": ["Villa María", "Villa Nueva", "Morrison", "Arroyo Cabral"],
    "ubicacion": [-32.4108, -63.2406]
  },
  {
    "departamento": "Ischilín",
    "ciudades": ["Deán Funes", "Quilino", "San José de las Salinas", "Charbonier"],
    "ubicacion": [-30.4255, -64.3444]
  },
  {
    "departamento": "Juárez Celman",
    "ciudades": ["La Carlota", "General Cabrera", "Santa Eufemia", "Ucacha"],
    "ubicacion": [-33.0412, -63.4998]
  },
  {
    "departamento": "Marcos Juárez",
    "ciudades": ["Marcos Juárez", "Arias", "Corral de Bustos", "Leones"],
    "ubicacion": [-32.6993, -62.1086]
  },
  {
    "departamento": "Presidente Roque Sáenz Peña",
    "ciudades": ["Laboulaye", "General Levalle", "Serrano", "Rosales"],
    "ubicacion": [-34.1249, -63.3908]
  },
  {
    "departamento": "Río Cuarto",
    "ciudades": ["Río Cuarto", "Las Higueras", "Berrotarán", "Holmberg"],
    "ubicacion": [-33.1307, -64.3499]
  },
  {
    "departamento": "Río Primero",
    "ciudades": ["Río Primero", "Monte Cristo", "La Para", "Capilla de los Remedios"],
    "ubicacion": [-31.6515, -63.8828]
  },
  {
    "departamento": "Río Segundo",
    "ciudades": ["Río Segundo", "Luque", "Oncativo", "Manfredi"],
    "ubicacion": [-31.6595, -63.9023]
  },
  {
    "departamento": "San Alberto",
    "ciudades": ["Mina Clavero", "Nono", "Los Hornillos", "Las Rabonas"],
    "ubicacion": [-31.7212, -65.0041]
  },
  {
    "departamento": "San Javier",
    "ciudades": ["Villa Dolores", "Villa de las Rosas", "Las Tapias", "La Paz"],
    "ubicacion": [-31.9408, -65.1887]
  },
  {
    "departamento": "San Justo",
    "ciudades": ["San Francisco", "Las Varillas", "Arroyito", "Balnearia"],
    "ubicacion": [-31.4287, -63.0008]
  },
  {
    "departamento": "Santa María",
    "ciudades": ["Anisacate", "Alta Gracia", "Villa La Bolsa", "Despeñaderos"],
    "ubicacion": [-31.6623, -64.4289],
    "imagen" : "alta-gracia.jpg"

  },
  {
    "departamento": "Tercero Arriba",
    "ciudades": ["Río Tercero", "Villa Ascasubi", "Almafuerte", "Embalse"],
    "ubicacion": [-32.1747, -64.1126]
  },
  {
    "departamento": "Totoral",
    "ciudades": ["Villa del Totoral", "Sinsacate", "Villa Santa Rosa", "Villa Cerro Azul"],
    "ubicacion": [-30.7975, -64.0985]
  },
  {
    "departamento": "Tulumba",
    "ciudades": ["Villa Tulumba", "San José de la Dormida", "Villa Tulumba", "Villa de San Miguel"],
    "ubicacion": [-30.7217, -63.8429]
  },
  {
    "departamento": "Unión",
    "ciudades": ["Bell Ville", "Morrison", "Monte Leña", "Cintra"],
    "ubicacion": [-32.6255, -62.6886]
  }
];
export function buscarCoordenadasPorDepartamento(departamento) {
  // Convertir el nombre del departamento a minúsculas para asegurar la búsqueda insensible a mayúsculas
  const nombreDepartamento = departamento.toLowerCase();

  // Buscar el objeto departamento dentro del arreglo RegionesCordoba
  const regionEncontrada = RegionesCordoba.find(region => region.departamento.toLowerCase() === nombreDepartamento);

  // Verificar si se encontró la región y devolver las coordenadas si existen
  if (regionEncontrada && regionEncontrada.ubicacion) {
    return regionEncontrada.ubicacion;
  } else {
    return null; // Si no se encuentra el departamento o no tiene ubicación, devolver null o manejar según necesites
  }
}
export const coordenadas = {
  "Córdoba": [-31.4135, -64.18105],
  "Punilla": [-31.2994, -64.4985],
  "Calamuchita": [-32.0464, -64.4995],
  "Colón": [-31.2389, -64.3125],
  "Cruz del Eje": [-30.7304, -64.7981],
  "General Roca": [-34.5885, -64.9311],
  "General San Martín": [-32.4108, -63.2406],
  "Ischilín": [-30.4255, -64.3444],
  "Juárez Celman": [-33.0412, -63.4998],
  "Marcos Juárez": [-32.6993, -62.1086],
  "Presidente Roque Sáenz Peña": [-34.1249, -63.3908],
  "Río Cuarto": [-33.1307, -64.3499],
  "Río Primero": [-31.6515, -63.8828],
  "Río Segundo": [-31.6595, -63.9023],
  "San Alberto": [-31.7212, -65.0041],
  "San Javier": [-31.9408, -65.1887],
  "San Justo": [-31.4287, -63.0008],
  "Santa María": [-31.6623, -64.4289],
  "Tercero Arriba": [-32.1747, -64.1126],
  "Totoral": [-30.7975, -64.0985],
  "Tulumba": [-30.7217, -63.8429],
  "Unión": [-32.6255, -62.6886]
};
export const SelectCiudades = ({ ciudades, onSelectCiudad, valorInicial }) => (
  <select value={valorInicial} onChange={(e) => onSelectCiudad(e.target.value)}>
    <option value="">Seleccionar Ciudad</option>
    {ciudades.map((ciudad, index) => (
      <option key={index} value={ciudad}>{ciudad}</option>
    ))}
  </select>
);

export const SelectDepartamentos = ({ departamentos, onSelectDepartamento, valorInicial }) => (
  <select value={valorInicial} onChange={(e) => onSelectDepartamento(e.target.value)}>
    <option value="">Seleccionar Departamento</option>
    {departamentos.map((departamento, index) => (
      <option key={index} value={departamento.departamento}>{departamento.departamento}</option>
    ))}
  </select>
);