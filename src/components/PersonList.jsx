import { useState } from "react";
import styles from "./PersonList.module.css";
import PersonCard from "./PersonCard";
import data from "../data";

const PersonList = () => {
  const [employees, setEmployees] = useState(data);

  return (
    <div className={styles.personList}>
      {employees.map((employee) => (
        <PersonCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
};

export default PersonList;
