import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navegacion from './Navegacion';
import TablaLectura from './TablaLectura';
import TablaCRUD from './TablaCRUD';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navegacion />
        <Routes>
          <Route path="/" element={<TablaLectura />} />
          <Route path="/crud" element={<TablaCRUD />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;