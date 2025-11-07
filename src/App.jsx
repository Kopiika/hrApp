import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import data from "./data"
import './App.css'

import Header from './components/Header';
import Footer from './components/Footer';

import PersonList from "./pages/PersonList";
import AddEmployee from "./pages/AddEmployee";
import About from "./pages/About";


function App() {

  //Стан — тут (спільний для всіх сторінок)
  const [employees, setEmployees] = useState(data);
   
  //Функція додає нового працівника
  function handleAddEmployee(newEmployee) {
    // додаємо нового в кінець масиву
    setEmployees(prev => [...prev, newEmployee]);
  }
  return (
    <>
      <Router>
        <div className='wrapper'>
           <Header/>
           <div className='main'>
              <Routes>
                {/* 🔸 передаємо employees у PersonList */}
                <Route path="/" element={<PersonList employees={employees}/>} />
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