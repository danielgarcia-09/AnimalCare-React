import { useEffect, useState } from "react"
import Form from "./components/Form"
import Header from "./components/Header"
import PatientList from "./components/PatientList"
import './index.css'

function App() {

  const [ patients, setPatients ] = useState(JSON.parse(localStorage.getItem("patients")) ?? []);
  const [ patient, setPatient ] = useState({});

  useEffect(()=>{
    localStorage.setItem("patients", JSON.stringify(patients))
  },[patients])

  const deletePatient = (id) => {
    const filter = patients.filter(patient => patient.id !== id);
    setPatients(filter);
  }

  return (
    <div className="container mx-auto mt-20">
      <Header/>
      
      <div className="mt-12 md:flex">
        <Form
          patients={patients}
          setPatients={setPatients}
          editPatient={patient}
          setEditPatient={setPatient}
        />
        <PatientList
          patients={patients}
          setPatient={setPatient}
          deletePatient={deletePatient}
        />
      </div>
    </div>
  )
}

export default App
