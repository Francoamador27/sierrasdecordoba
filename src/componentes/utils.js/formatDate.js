export function formatDate(date) {
    if (date instanceof Date) {
      const day = date.getDate();
      const month = date.getMonth() + 1; // ¡Ojo! getMonth devuelve de 0 a 11
      const year = date.getFullYear().toString().slice(-2); // Obtiene los últimos dos dígitos del año
      const formattedDay = day < 10 ? '0' + day : day;
      const formattedMonth = month < 10 ? '0' + month : month;

      return `${formattedDay}/${formattedMonth}/${year}`;
    } else {
      return ''; // O cualquier valor predeterminado que desees
    }
  }

 export const stringifyDates = (availability) => {
    const stringifiedAvailability = {};
    for (const key in availability) {
      if (availability.hasOwnProperty(key)) {
        const dateObj = availability[key];
        // Verifica si dateObj es un objeto y si tiene propiedades de fecha (startDate y endDate)
        if (typeof dateObj === 'object' && dateObj.startDate instanceof Date && dateObj.endDate instanceof Date) {
          // Convierte las fechas a cadenas de texto utilizando toISOString()
          const stringifiedStartDate = dateObj.startDate.toISOString();
          const stringifiedEndDate = dateObj.endDate.toISOString();
          // Crea un nuevo objeto con las fechas convertidas a cadenas de texto
          stringifiedAvailability[key] = { startDate: stringifiedStartDate, endDate: stringifiedEndDate, ...dateObj };
        } else {
          // Si no es un objeto con propiedades de fecha, simplemente copia el objeto tal cual
          stringifiedAvailability[key] = dateObj;
        }
      }
    }
    return stringifiedAvailability;
  };

 export function convertirFechasADate(objeto) {
    for (let clave in objeto) {
      if (objeto[clave] && typeof objeto[clave] === 'object' && objeto[clave].startDate && objeto[clave].endDate) {
        objeto[clave].startDate = new Date(objeto[clave].startDate);
        objeto[clave].endDate = new Date(objeto[clave].endDate);
      }
    }
    return objeto;
  }