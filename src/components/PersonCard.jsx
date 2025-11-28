import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useYearsWorked } from "../hooks/useYearsWorked";
import Emoji from "./Emoji";
import styles from './PersonCard.module.css';
import useAxios from "../hooks/useAxios";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button
 } from "@mui/material";

const PersonCard = ({ handleDeleteEmployee }) => {
	const { get, patch } = useAxios();
	const { id } = useParams();
  	const navigate = useNavigate();

	const [employee, setEmployee] = useState(null);
	const [loading, setLoading] = useState(true);
	const[isEditing, setIsEditing] = useState(false);

	const [open, setOpen] = useState(false);
	const openDialog = () => {
		console.log("Dialog opened");
		setOpen(true);
	 };
  	const closeDialog = () => setOpen(false);
	  const confirmDelete = () => {
		console.log("Confirm delete triggered");
		closeDialog();
		handleDeleteEmployee(id, navigate);
	 };

	const [formData, setformData] = useState ({
		salary: employee?.salary || "",
		location: employee?.location || "",
		department: employee?.department || "",
		skills: employee?.skills.join(", ") || "",
	});

	const [saveMessage, setSaveMessage] = useState("");


	const handleChange = (e) =>{
		setformData((prevState) =>{
			return {...prevState, [e.target.name]: e.target.value}
		})
	}

	const toggleEdit =()=>{
		setIsEditing(!isEditing);
	}

	const handleSave =()=>{
		patch(`/employees/${id}`, {
			salary: formData.salary,
      	location: formData.location,
     		department: formData.department,
			skills: formData.skills.split(",").map((skill) => skill.trim()),
		})
		.then((response) =>{
			setEmployee(response.data)
			setSaveMessage("Changes saved!");
			setTimeout(() => {
				setSaveMessage("");
				setIsEditing(false)
			}, 2000);
		})
		.catch((error)=>{
			console.log("Error: ", error.message)
		})
	}

	  useEffect(() => {
		get(`/employees/${id}`)
		  .then((response) => {
				setEmployee(response.data)
				setformData({
					salary:response.data.salary || "",
					location:response.data.location || "",
					department:response.data.department || "",
					skills:Array.isArray(response.data.skills) ? response.data.skills.join(", ") : "",
				})	
			})	
		  .catch((err) => console.error("Error:", err))
        .finally(() => setLoading(false));
	 }, [id, get]);

	const { totalYears, monthsWorked, reminder } = useYearsWorked(employee?.startDate);

	if (loading) return <div>Loading...</div>;
	if (!employee) return <div>Employee not found.</div>;

	if (isEditing) {
		return (
			<div className='wrapper'>
				<div className='main'>
					<div className={styles.person}>
					<h1>Edit Employee: {employee.name}</h1>
					{saveMessage && <div className={styles.saveMessage}>{saveMessage}</div>}
				   <form className="form">
						<label htmlFor="salary">
							Salary:
							<input
								id="salary"
								type="number"
								name="salary"
								value={formData.salary}
								onChange={handleChange}>
							</input>
						</label>
						<label htmlFor="location">
							Location:
							<input
								id="location"
								type="text"
								name="location"
								value={formData.location}
								onChange={handleChange}>
							</input>
						</label>
						<label htmlFor="department">
							Department:
							<input
								id="department"
								type="text"
								name="department"
								value={formData.department}
								onChange={handleChange}>
							</input>
						</label>
						<label htmlFor="skills">
							Skills (comma separated):
							<input
								id="skills"
								type="text"
								name="skills"
								value={formData.skills}
								onChange={handleChange}>
							</input>
						</label>
					</form>
					<div className={styles.buttonContainer}>
						<button className="saveBtn" onClick={handleSave}>Save</button>
						<button className="cancelBtn" onClick={toggleEdit}>Cancel</button>
					</div>
					</div>
				</div>
			</div>
		)}
			
	
  return (
	<div className="wrapper">
	<div className="main">
	 <div className={styles.person}>
	 	<h1>{isEditing ? "Edit Employee" : "Employee Details"}</h1>

		 <div className={styles.reminderContainer}>{reminder && <div className="reminder">{reminder}</div>}</div>

		<h2 className={styles.name}>
		  {employee.name} <Emoji animal={employee.animal} />
		</h2>

		<p className={styles.row}>
		  <span className={styles.label}>Title:</span> 
		  <span className={styles.value}>{employee.title}</span>
		</p>
		<p className={styles.row}>
			<span className={styles.label}>Salary:</span> <span className={styles.value}>{employee.salary} €</span>
		</p>
		<p className={styles.row}>
			<span className={styles.label}>Phone:</span> 
			<span className={styles.value}>{employee.phone}</span>
		</p>
		<p className={styles.row}>
			<span className={styles.label}>Email:</span>
			<span className={styles.value}>{employee.email}</span>
		</p>
		<p className={styles.row}>
			<span className={styles.label}>Favorite Animal:</span>
			<span className={styles.value}><Emoji animal={employee.animal} /> ({employee.animal})</span>
		</p>
		<p className={styles.row}>
			<span className={styles.label}>Start Date:</span> 
			<span className={styles.value}>{employee.startDate}</span>
		</p>
		<p className={styles.row}>
			<span className={styles.label}>Location:</span> 
			<span className={styles.value}>{employee.location} </span>
		</p>
		<p className={styles.row}>
			<span className={styles.label}>Department:</span> 
			<span className={styles.value}>{employee.department}</span>
		</p>
		<p className={styles.row}>
			<span className={styles.label}>Skills:</span>
			<span className={styles.value}>{Array.isArray(employee.skills) ? employee.skills.join(", ") : ""}</span>
		</p>

		<IconButton
			aria-label="delete"
			onClick={openDialog}
			sx={{
				position: "absolute",
				top: "10px",
				right: "10px",
				color: "#4ca9ca",
				transition: "all 0.3s ease", 
				"&:hover": {
					color: "red", 
					backgroundColor: "rgba(255, 0, 0, 0.1)"}
			}}>
		<DeleteIcon />
		</IconButton>

		{/* 🔥 Material UI Confirm Dialog */}
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Do you really want to delete this employee?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDialog}>No</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
		<div className={styles.buttonContainer}>
			<button className="editBtn" onClick={toggleEdit}>Edit</button>
			<button className="navButton" onClick={() => navigate("/")}>
	        Return to Home
	      </button>
		</div>
		
	 </div>
	 </div>
	 </div>
  );
};

export default PersonCard;
