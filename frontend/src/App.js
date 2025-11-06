import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/estudiantes/')
      .then(response => {
        setEstudiantes(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al cargar estudiantes:', error);
        setError('Error al cargar los datos');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Cargando estudiantes...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="App">
      <div className="container">
        <h1>📚 Sistema de Gestión de Estudiantes</h1>
        <div className="card">
          <table className="tabla-estudiantes">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Carrera</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map(estudiante => (
                <tr key={estudiante.id}>
                  <td>{estudiante.id}</td>
                  <td>{estudiante.nombre}</td>
                  <td>{estudiante.edad}</td>
                  <td>{estudiante.carrera}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="footer">
          <p>Total de estudiantes: <strong>{estudiantes.length}</strong></p>
        </div>
      </div>
    </div>
  );
}

export default App;