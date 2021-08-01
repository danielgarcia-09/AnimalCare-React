import { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";
import PropTypes from 'prop-types';

function App() {

  //! Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if( !citasIniciales ) {
    citasIniciales = [];
  }
   
  // * Arreglo de citas
  const [ citas, guardarCitas ] = useState(citasIniciales);

  //todo | Use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect( ()=> {

    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(citasIniciales) {

      localStorage.setItem('citas',JSON.stringify(citas));

    } else {
      localStorage.setItem('citas',JSON.stringify([]));
    }
  }, [citas] );

  // ? Funcion que tome las citas actuales y agregue la nueva
  //! Primero le pasamos una copia de las citas actuales y despues ingresamos la nueva cita
  const crearCita = cita => {
    guardarCitas([...citas, cita ])
  }

  // * Funcion que elimina una cita por su ID
  const eliminarCita = id => {
    const nuevasCitas = citas.filter( cita => cita.id !== id);
    guardarCitas( nuevasCitas );
  }

  //? Mensaje Condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={ crearCita } 
            />
          </div>
          <div className="one-half column">
            <h2> { titulo }</h2>
            { citas.map(cita => (
              <Cita
                key={ cita.id } 
                cita={ cita }
                eliminarCita={ eliminarCita }
              />
            )) }
          </div>
        </div>
      </div>
    </Fragment>
  );
}

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default App;
