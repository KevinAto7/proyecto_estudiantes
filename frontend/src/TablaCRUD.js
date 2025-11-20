import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TablaCRUD.css';

function TablaCRUD() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [estudianteActual, setEstudianteActual] = useState({
    id: null,
    nombre: '',
    edad: '',
    carrera: ''
  });

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  const cargarEstudiantes = () => {
    axios.get('http://localhost:8000/api/estudiantes/')
      .then(response => {
        setEstudiantes(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al cargar estudiantes:', error);
        alert('Error al cargar los datos');
        setLoading(false);
      });
  };

  const abrirModalCrear = () => {
    setModoEdicion(false);
    setEstudianteActual({
      id: null,
      nombre: '',
      edad: '',
      carrera: ''
    });
    setMostrarModal(true);
  };

  const abrirModalEditar = (estudiante) => {
    setModoEdicion(true);
    setEstudianteActual(estudiante);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setEstudianteActual({
      id: null,
      nombre: '',
      edad: '',
      carrera: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEstudianteActual({
      ...estudianteActual,
      [name]: value
    });
  };

  const crearEstudiante = () => {
    if (!estudianteActual.nombre || !estudianteActual.edad || !estudianteActual.carrera) {
      alert('Por favor completa todos los campos');
      return;
    }

    axios.post('http://localhost:8000/api/estudiantes/', {
      nombre: estudianteActual.nombre,
      edad: parseInt(estudianteActual.edad),
      carrera: estudianteActual.carrera
    })
      .then(() => {
        alert('Estudiante creado exitosamente');
        cargarEstudiantes();
        cerrarModal();
      })
      .catch(error => {
        console.error('Error al crear estudiante:', error);
        alert('Error al crear el estudiante');
      });
  };

  const actualizarEstudiante = () => {
    if (!estudianteActual.nombre || !estudianteActual.edad || !estudianteActual.carrera) {
      alert('Por favor completa todos los campos');
      return;
    }

    axios.put(`http://localhost:8000/api/estudiantes/${estudianteActual.id}/`, {
      nombre: estudianteActual.nombre,
      edad: parseInt(estudianteActual.edad),
      carrera: estudianteActual.carrera
    })
      .then(() => {
        alert('Estudiante actualizado exitosamente');
        cargarEstudiantes();
        cerrarModal();
      })
      .catch(error => {
        console.error('Error al actualizar estudiante:', error);
        alert('Error al actualizar el estudiante');
      });
  };

  const eliminarEstudiante = (id, nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar a ${nombre}?`)) {
      axios.delete(`http://localhost:8000/api/estudiantes/${id}/`)
        .then(() => {
          alert('Estudiante eliminado exitosamente');
          cargarEstudiantes();
        })
        .catch(error => {
          console.error('Error al eliminar estudiante:', error);
          alert('Error al eliminar el estudiante');
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modoEdicion) {
      actualizarEstudiante();
    } else {
      crearEstudiante();
    }
  };

  if (loading) return <div className="loading">Cargando estudiantes...</div>;

  return (
    <div className="crud-container">
      <div className="container">
        <h1>⚙️ Gestión de Estudiantes (CRUD)</h1>
        
        <button className="btn-crear" onClick={abrirModalCrear}>
          ➕ Agregar Nuevo Estudiante
        </button>

        <div className="card">
          <table className="tabla-crud">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Carrera</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map(estudiante => (
                <tr key={estudiante.id}>
                  <td>{estudiante.id}</td>
                  <td>{estudiante.nombre}</td>
                  <td>{estudiante.edad}</td>
                  <td>{estudiante.carrera}</td>
                  <td>
                    <button 
                      className="btn-editar"
                      onClick={() => abrirModalEditar(estudiante)}
                    >
                      ✏️ Editar
                    </button>
                    <button 
                      className="btn-eliminar"
                      onClick={() => eliminarEstudiante(estudiante.id, estudiante.nombre)}
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="footer">
          <p>Total de estudiantes: <strong>{estudiantes.length}</strong></p>
        </div>
      </div>

      {mostrarModal && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{modoEdicion ? '✏️ Editar Estudiante' : '➕ Crear Estudiante'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  value={estudianteActual.nombre}
                  onChange={handleInputChange}
                  placeholder="Ingresa el nombre"
                  required
                />
              </div>
              <div className="form-group">
                <label>Edad:</label>
                <input
                  type="number"
                  name="edad"
                  value={estudianteActual.edad}
                  onChange={handleInputChange}
                  placeholder="Ingresa la edad"
                  required
                />
              </div>
              <div className="form-group">
                <label>Carrera:</label>
                <input
                  type="text"
                  name="carrera"
                  value={estudianteActual.carrera}
                  onChange={handleInputChange}
                  placeholder="Ingresa la carrera"
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="btn-guardar">
                  {modoEdicion ? '💾 Actualizar' : '➕ Crear'}
                </button>
                <button type="button" className="btn-cancelar" onClick={cerrarModal}>
                  ❌ Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TablaCRUD;