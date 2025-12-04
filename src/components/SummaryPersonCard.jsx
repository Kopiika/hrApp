import { useYearsWorked } from "../hooks/useYearsWorked";
import Emoji from "./Emoji";
import styles from "./SummaryPersonCard.module.css";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardActions, Typography, Button, Box } from "@mui/material";

const SummaryPersonCard = ({ employee }) => {
  const { totalYears, reminder } = useYearsWorked(employee.startDate);
  const navigate = useNavigate();

  return (
    <Card className={styles.card} elevation={0}>
      
      {/* Header */}
      <Box className={styles.cardHeader}>
        <Typography variant="h5" component="h2" sx={{ marginBottom: '10px', fontSize: '2rem' }}>
          {employee.name} <Emoji animal={employee.animal} />
        </Typography>
        <Typography variant="body1" color="inherit">
          {employee.title}
        </Typography>
      </Box>

      {/* Body */}
      <CardContent className={styles.cardBody}>
        <Typography><strong>Department:</strong> {employee.department}</Typography>
        <Typography><strong>Location:</strong> {employee.location}</Typography>
        <Typography><strong>Years of Work:</strong> {totalYears}</Typography>
        <Typography><strong>Animal:</strong> {employee.animal}</Typography>
      </CardContent>

      {/* Reminder */}
      <div className={styles.reminderContainer}>
        {reminder && <div className="reminder">{reminder}</div>}
      </div>

      {/* Footer */}
      <CardActions className={styles.cardFooter}>
        <Button
          variant="text"
          className="navButton"
          onClick={() => navigate(`/employees/${employee.id}`)}
        >
          See details / Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default SummaryPersonCard;
