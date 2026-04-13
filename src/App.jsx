import { useEffect, useState } from "react";
import useAxios from "./hooks/useAxios";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import PersonList from "./pages/PersonList";
import PersonCard from "./components/PersonCard";
import SummaryPersonCard from "./components/SummaryPersonCard";
import AddEmployee from "./pages/AddEmployee";
import About from "./pages/About";
import EmployeePage from "./pages/EmployeesPage";


function App() {
  const { get, post, remove } = useAxios();
  const [employees, setEmployees] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [addError, setAddError] = useState("");

  useEffect(()=>{
    get("/employees")
    .then((response) =>{
       setEmployees(response.data)
    })
    .catch(() => setFetchError("Failed to load employees. Please check that the server is running."));
  }, [get]);

  const handleAddEmployee = (newEmployee) =>{
    setAddError("");
    post("/employees", newEmployee)
    .then((response) =>{
      setEmployees(prev => [...prev, response.data])
    })
    .catch(() => {
      setAddError("Failed to add employee. Please try again.");
      setTimeout(() => setAddError(""), 3000);
    });
  }

  const handleDeleteEmployee = (id, navigate) => {
    remove(`/employees/${id}`)
    .then(() =>{
      setEmployees(prev => prev.filter((e) => e.id !==id))
      setDeleteMessage("Employee successfully deleted!");
      navigate("/");

      setTimeout(() => {
        setDeleteMessage("");
      }, 2000);
    })
    .catch(() => {
      setDeleteMessage("Error deleting employee.");
      setTimeout(() => setDeleteMessage(""), 2000);
    })
    }
  

  return (
    <>
      <Router>
        <div className='wrapper'>
           <Header/>
           <div className='main'>
              {fetchError && <div style={{ color: "red", padding: "1rem" }}>{fetchError}</div>}
              {addError && <div style={{ color: "red", padding: "1rem" }}>{addError}</div>}
              <Routes>
                <Route path="/" element={<PersonList employees={employees} deleteMessage={deleteMessage}/>} />
                <Route path="/table" element={<EmployeePage handleDeleteEmployee={handleDeleteEmployee}/>} />
                <Route path="/employees/:id" element={<PersonCard handleDeleteEmployee={handleDeleteEmployee}/>} />
                <Route path="/about" element={<About/>} />
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