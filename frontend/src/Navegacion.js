import React from 'react';
import { Link } from 'react-router-dom';
import './Navegacion.css';

function Navegacion() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <h2 className="nav-logo">📚 Sistema Estudiantes</h2>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              📖 Vista Lectura
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/crud" className="nav-link">
              ⚙️ Gestión CRUD
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navegacion;