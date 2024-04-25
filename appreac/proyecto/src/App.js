import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el archivo CSS de Bootstrap
import './App.css'; // Importa tu archivo CSS personalizado

function App() {
  const [matricula, setMatricula] = useState('');
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Datos del formulario:', { matricula, nombre, direccion }); // Verifica los datos del formulario en la consola
      const response = await axios.post('http://localhost:3000/create', { matricula, nombre, direccion });
      console.log('Respuesta de la API:', response.data); // Muestra la respuesta de la API en la consola
      alert('Datos enviados correctamente');
      // Limpiar los campos del formulario después de enviarlos
      setMatricula('');
      setNombre('');
      setDireccion('');
    } catch (error) {
      console.error('Error al enviar datos:', error);
      alert('Error al enviar datos');
    }
  };

  return (
    <div className="container">
      <img src="https://www.normalexperimental.edu.mx/img_secciones/rese2.jpg" alt="Imagen de encabezado" className="header-image" />
      <div className="form-container">
        <h3>Formulario de Alumnos</h3>
      
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="matricula" className="form-label">Matrícula:</label>
            <input type="text" className="form-control" id="matricula" placeholder='233223' value={matricula} onChange={(e) => setMatricula(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre:</label>
            <input type="text" className="form-control" id="nombre" placeholder='Luis' value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="direccion" className="form-label">Dirección:</label>
            <input type="text" className="form-control" id="direccion" placeholder='calle 13' value={direccion} onChange={(e) => setDireccion(e.target.value)} />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-lg">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
