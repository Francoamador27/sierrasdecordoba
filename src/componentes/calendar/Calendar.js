import { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from 'date-fns';

export function Calendar({ onAvailabilityChange,availability }) {
    const [state, setState] = useState({
        selection: {
            startDate: addDays(new Date(), 1),
            endDate: addDays(new Date(), 1),
            key: "selection",
            color: "blue"
        },
    });
   
    
    const handleAddRange = (e) => {
        e.preventDefault();
        const arrayState = Object.values(state)
        const newKey = arrayState.length + 1;
        
        setState({
            [newKey]: {
                startDate: addDays(new Date(), 1),
                endDate: null,
                key: newKey,
                color: "blue"
            }, ...state
        })

    };
    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // ¡Ojo! getMonth devuelve de 0 a 11
        const year = date.getFullYear().toString().slice(-2); // Obtiene los últimos dos dígitos del año
        const formattedDay = day < 10 ? '0' + day : day;
        const formattedMonth = month < 10 ? '0' + month : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    }
  
    const handleRemoveRange =  (key) => {
         setState((prevState) => {
            const newState = { ...prevState };
            delete newState[key];
            return newState;
        });
    };
    const handleEditChange = (item) => {
        setState({ ...state, ...item });
    };
  
    console.log("state",state)
    return (
        <>
        <section className="agenda">

       
         <div className="button ">
                <button className="addState" onClick={handleAddRange}>Agregar Rango</button>
            </div>
            {state && 
            
            <DateRangePicker
                onChange={handleEditChange}
                ranges={Object.values(state).reverse()} />
            }

            <div className="group-dates">

            {Object.values(state) && Object.values(state).reverse().map((item, index) => (
                <div className="fechas" key={item.key}>
                    <p>Disponibilidad</p>
                    <p>Dia Inicial: {item.startDate ? formatDate(item.startDate):'No Seleccionado'}</p>
                    <p>Dia Final: {item.endDate ? formatDate(item.endDate) : 'No seleccionado'}</p>
                    <button className="delete-range" onClick={() => handleRemoveRange(item.key)}><i class="bi bi-calendar2-x"></i> Eliminar</button>

                </div>
            ))}
            </div>
            </section>
        </>
    )
}