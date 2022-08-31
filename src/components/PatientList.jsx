import { useEffect } from "react";
import Patient from "./Patient";

const PatientList = ({ patients, setPatient, deletePatient }) => {

    useEffect(()=> {
       if(patients.length > 0) console.log("new patient!");
    }, [patients])
  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      {patients && patients.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Patients List</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administer your {""}
            <span className="text-indigo-600 font-bold">
              Patients and Appointments
            </span>
          </p>
          {patients &&
            patients.map((patient) => (
              <Patient key={patient.id} patient={patient} setPatient={setPatient} deletePatient={deletePatient} />
            ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No Patients</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Start by adding {""}
            <span className="text-indigo-600 font-bold">
              some patients and they will appear below 
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default PatientList;
