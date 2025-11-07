import { useState } from "react";
import styles from "./PersonList.module.css";
import PersonCard from "../components/PersonCard";
import data from "../data";

const PersonList = ({employees}) => {
  

  return (
    <div className={styles.personList}>
      {employees.map((employee) => (
        <PersonCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
};

export default PersonList;
