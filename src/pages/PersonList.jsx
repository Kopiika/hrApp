import PropTypes from "prop-types";
import { Alert } from "@mui/material";
import styles from "./PersonList.module.css";
import SummaryPersonCard from "../components/SummaryPersonCard";

const PersonList = ({employees, deleteMessage}) => {

  return (
    <>
      {deleteMessage && (
        <Alert
          severity={deleteMessage.startsWith("Error") ? "error" : "success"}
          sx={{ mb: 2 }}
        >
          {deleteMessage}
        </Alert>
      )}
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
