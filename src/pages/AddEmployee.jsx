import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";

 function AddEmployee({onAddEmployee}) {

	// useNavigate з react-router для переходу після успішного додавання
  const navigate = useNavigate();
  function handleAdd(newEmployee) {
	if (typeof onAddEmployee === "function") {
      onAddEmployee(newEmployee);
    }
	 navigate("/");
  }
  
	
	return (
		<main>
			{/* Передаємо handleAdd як onSubmit до EmployeeForm */}
			<EmployeeForm onSubmit={handleAdd}/>
		</main>
	);
 }

 export default AddEmployee