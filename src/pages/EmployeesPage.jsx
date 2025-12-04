import EmployeeTable from "../components/EmployeeTable";

const EmployeePage = ({handleDeleteEmployee}) => {

  return (
    <>
        <EmployeeTable handleDeleteEmployee={handleDeleteEmployee}/>
    </>
  );
};

export default EmployeePage;
