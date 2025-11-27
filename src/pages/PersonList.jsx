import styles from "./PersonList.module.css";
import SummaryPersonCard from "../components/SummaryPersonCard";

const PersonList = ({employees}) => {

  return (
    <div className={styles.personList}>
      {employees.map((employee) => (
        <SummaryPersonCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
};

export default PersonList;
