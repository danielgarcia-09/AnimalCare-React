import { useEffect, useState } from "react";
import Error from "./Error";
import { v4 as uuid } from 'uuid';

const Form = ({ patients, setPatients, editPatient, setEditPatient }) => {

    const [ patient, setPatient ] = useState({
        name: "",
        owner: "",
        email: "",
        date: "",
        symptoms: ""
    });
    const [ error, setError ] = useState(false);

    useEffect(()=> {
        if (Object.keys(editPatient).length > 0) setPatient(editPatient);
    }, [editPatient])

    const { name, owner, email, date, symptoms } = patient;

    const handleChange = e => {
        setPatient({
            ...patient,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        if( [name, owner, email, date, symptoms].includes("") ) {
            setError(true)
            return;
        }
        setError(false)

        if(editPatient.id) {
            const updatedPatients = patients.map( patientState => patientState.id === editPatient.id ? patient : patientState)
            setPatients(updatedPatients);
            setEditPatient({})
        } else {
            patient.id = uuid();
            setPatients([...patients, patient]);
        }

        setPatient({ name: "", owner: "", email: "", date: "", symptoms: ""})
    }

    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">Patients follow up</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Add Patients and {''}
                <span className="text-indigo-600 font-bold">
                    Administer them
                </span>
            </p>

            <form
             onSubmit={handleSubmit}
             className="bg-white rounded-lg shadow-md py-10 p-5 mb-10"
            >
                {error && (
                  <Error
                    message="All fields required"
                  />
                )}
                <div className="mb-5">
                    <label htmlFor="mascot" className="block text-gray-700 uppercase font-bold">Pet Name</label>
                    <input
                        id="mascot"
                        name="name"
                        type="text"
                        placeholder="Your pet's name"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                
                <div className="mb-5">
                    <label htmlFor="owner" className="block text-gray-700 uppercase font-bold">Owner Name</label>
                    <input
                        id="owner"
                        name="owner"
                        type="text"
                        placeholder="Owner's name"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={owner}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="date" className="block text-gray-700 uppercase font-bold">Appointment Date</label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        placeholder="Choose the day that works for you"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={date}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="symptoms" className="block text-gray-700 uppercase font-bold">Symptoms</label>
                    <textarea
                        id="symptoms"
                        name="symptoms"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Describe your pet's symptoms"
                        value={symptoms}
                        onChange={handleChange}
                    />
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
                    value={ patient.id ? "Edit Appointment" : "Add Appointment"}
                />

            </form>
        </div>
    );
}
 
export default Form;