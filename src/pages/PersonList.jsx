import PropTypes from "prop-types";
import styles from "./PersonList.module.css";
import SummaryPersonCard from "../components/SummaryPersonCard";

const PersonList = ({employees, deleteMessage}) => {

  return (
    <>
      {deleteMessage && <div className={styles.deleteMessage}>{deleteMessage}</div>}
      <div className={styles.personList}>
        {employees.map((employee) => (
          <SummaryPersonCard key={employee.id} employee={employee} />
        ))}
      </div>
    </>
  );
};

PersonList.propTypes = {
  employees: PropTypes.array.isRequired,
  deleteMessage: PropTypes.string,
};

export default PersonList;
