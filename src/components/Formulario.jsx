import { Fragment, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
 
const Formulario = ({ crearCita }) => {


    // * Crear State de Citas
    const [ cita, actualizarCita ] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    //! State de ERROR
    const [ error, actualizarError ] = useState(false);

    //todo | Funcion que se ejecuta cada vez que el usuario escribe en un input;

    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    // * Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    //? Cuando el usuario presiona agregar cita
    const submitCita = e => {
        e.preventDefault();


        //! Validar
        if( mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
           actualizarError(true);
            return;
        }

        // * Eliminar el error previo
        actualizarError(false);

        //todo | Asignar un ID
        cita.id = uuidv4();

        // * Crear la cita
        crearCita(cita);

        //? Reiniciar el form
        //TODO | El form se reinicia por en los values de los input estan estas propiedades, si las propiedades estan vacias aqui el value de los inputs estara vacio tambien
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

            <form
                onSubmit={ submitCita }
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Ej: Ellie <3"
                    onChange={ actualizarState }
                    value= { mascota }
                />
                <label>Nombre Dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Ej: Daniel Garcia"
                    onChange={ actualizarState }
                    value={ propietario }
                />
                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={ actualizarState }
                    value={ fecha }
                />
                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={ actualizarState }
                    value={ hora }
                />
                <label>Sintomas</label>
                <textarea
                    style={{resize: 'none'}}
                    className="u-full-width"
                    name="sintomas"
                    onChange={ actualizarState }
                    value={ sintomas }
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
     );
}
 
export default Formulario;