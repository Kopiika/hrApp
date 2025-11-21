import { useEffect, useState } from "react";
import axios from 'axios';
import data from "./data"
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import Footer from './components/Footer';

import PersonList from "./pages/PersonList";
import PersonCard from "./components/PersonCard";
import SummaryPersonCard from "./components/SummaryPersonCard";
import AddEmployee from "./pages/AddEmployee";
import About from "./pages/About";


function App() {

  //Стан — тут (спільний для всіх сторінок)
  const [employees, setEmployees] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3001/employees")
    .then((response) =>{
       setEmployees(response.data)
    })
    .catch(err => console.error(err));
  }, [])
   
  const handleAddEmployee = (newEmployee) =>{
    axios.post("http://localhost:3001/employees", newEmployee)
    .then((response) =>{
      setEmployees(prev => [...prev, response.data])
    })
    .catch(err => console.error(err));
  }

  const handleDeleteEmployee = (id) => {
    axios.delete(`http://localhost:3001/employees/${id}`)
    .then((response) =>{
      setEmployees(employees.filter((employee) => employee.id !==id))
    })
    }
  
  /*const handleUpdateEmployee = (id, updatedEmployee) => {
    axios.put(`http://localhost:3001/employees/${id}`, updatedEmployee)
    .then((response) =>{
      setEmployees(employees.map((employee) => employee.id === id ? response.data : employee)
    )
    return response.data;
    })
    .catch(err => console.error(err));
  }*/

  return (
    <>
      <Router>
        <div className='wrapper'>
           <Header/>
           <div className='main'>
              <Routes>
                {/* 🔸 передаємо employees у PersonList */}
                <Route path="/" element={<PersonList employees={employees} handleDeleteEmployee={handleDeleteEmployee} />} />
                <Route path="/employees/:id" element={<PersonCard/>} />
                <Route path="/about" element={<About/>} />
                {/* 🔸 передаємо функцію у AddEmployee */}
                <Route path="/add" element={<AddEmployee onAddEmployee={handleAddEmployee}/>} />
              </Routes>
           </div>
           <Footer/>
        </div>
      </Router>
    </>
  )
}

export default App