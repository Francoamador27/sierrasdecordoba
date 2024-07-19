import React, { useState } from 'react';
import "../../css/BottomNav.css"
import 'bootstrap/dist/css/bootstrap.min.css';
const BottomNav = () => {
    const [activeButton, setActiveButton] = useState('list');
  
    const handleButtonClick = (button) => {
      setActiveButton(button);
      const element = document.getElementById(button);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };
  
    return (
      <div className={`bottom-nav-switch ${activeButton}`}>
        <button 
          className={activeButton === 'list' ? 'active-switch' : ''} 
          onClick={() => handleButtonClick('list')}
        >
          <i className="bi  bi-list-task"></i>
        </button>
        <button 
          className={activeButton === 'map' ? 'active-switch' : ''} 
          onClick={() => handleButtonClick('map')}
        >
          <i className="bi bi-map"></i>
        </button>
        <div className="switch"></div>
      </div>
    );
  };
  
  export default BottomNav;