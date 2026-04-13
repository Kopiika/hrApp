import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import EmployeeForm from "../components/EmployeeForm";

 function AddEmployee({onAddEmployee}) {

  const navigate = useNavigate();
  function handleAdd(newEmployee) {
    if (typeof onAddEmployee === "function") {
      onAddEmployee(newEmployee);
    }
    navigate("/");
  }

  return (
    <main>
      <EmployeeForm onSubmit={handleAdd}/>
    </main>
  );
 }

AddEmployee.propTypes = {
  onAddEmployee: PropTypes.func.isRequired,
};

export default AddEmployee