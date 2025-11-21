import { useYearsWorked } from "../hooks/useYearsWorked";
import Emoji from "./Emoji";
import styles from "./SummaryPersonCard.module.css";
import {useNavigate} from "react-router-dom"

const SummaryPersonCard = ({ employee, onClick }) => {
  const { totalYears, reminder } = useYearsWorked(employee.startDate);
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>{employee.name} <Emoji animal={employee.animal}/> </h2>
        <p>{employee.title}</p>
      </div>
      <div className={styles.cardBody}>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Location:</strong> {employee.location}</p>
        <p><strong>Years of Work:</strong> {totalYears}</p>
        <p><strong>Animal:</strong> {employee.animal}</p>
      </div>
		<div className={styles.reminderContainer}>{reminder && <div className="reminder">{reminder}</div>}</div>

		<div className={styles.cardFooter}>
		  <button className="navButton" onClick={()=> navigate(`/employees/${employee.id}`)}>
  		See details / Edit</button>
		</div>

    </div>
  );
};

export default SummaryPersonCard;
