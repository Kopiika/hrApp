import PropTypes from "prop-types";
import EmployeeTable from "../components/EmployeeTable";

const EmployeePage = ({handleDeleteEmployee}) => {

  return (
    <>
        <EmployeeTable handleDeleteEmployee={handleDeleteEmployee}/>
    </>
  );
};

EmployeePage.propTypes = {
  handleDeleteEmployee: PropTypes.func.isRequired,
};

export default EmployeePage;
