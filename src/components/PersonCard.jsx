import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useYearsWorked } from "../hooks/useYearsWorked";
import Emoji from "./Emoji";
import styles from './PersonCard.module.css';
import useAxios from "../hooks/useAxios";
import { IconButton, Skeleton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
 } from "@mui/material";

const PersonCard = ({ handleDeleteEmployee }) => {
	const { get, patch } = useAxios();
	const { id } = useParams();
  	const navigate = useNavigate();

	const [employee, setEmployee] = useState(null);
	const [loading, setLoading] = useState(true);
	const[isEditing, setIsEditing] = useState(false);

	const [open, setOpen] = useState(false);
	const openDialog = () => setOpen(true);
  	const closeDialog = () => setOpen(false);
	const confirmDelete = () => {
		closeDialog();
		handleDeleteEmployee(id, navigate);
	};

	const [formData, setFormData] = useState ({
		salary: employee?.salary || "",
		location: employee?.location || "",
		department: employee?.department || "",
		skills: employee?.skills?.join(", ") || "",
	});

	const [saveMessage, setSaveMessage] = useState("");
	const [saveError, setSaveError] = useState("");


	const handleChange = (e) =>{
		setFormData((prevState) =>{
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
		.catch(() => {
			setSaveError("Failed to save changes. Please try again.");
			setTimeout(() => setSaveError(""), 3000);
		})
	}

	  useEffect(() => {
		get(`/employees/${id}`)
		  .then((response) => {
				setEmployee(response.data)
				setFormData({
					salary:response.data.salary || "",
					location:response.data.location || "",
					department:response.data.department || "",
					skills:Array.isArray(response.data.skills) ? response.data.skills.join(", ") : "",
				})	
			})	
		  .catch(() => setSaveError("Failed to load employee."))
        .finally(() => setLoading(false));
	 }, [id, get]);

	const { reminder } = useYearsWorked(employee?.startDate);

	if (loading) return (
		<Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
			<Skeleton variant="text" width="60%" height={40} />
			<Skeleton variant="text" width="40%" />
			<Skeleton variant="rectangular" height={200} sx={{ mt: 2, borderRadius: 1 }} />
		</Box>
	);
	if (!employee) return <div>Employee not found.</div>;
	if (saveError && !isEditing) return <div style={{ color: "red", padding: "1rem" }}>{saveError}</div>;

	if (isEditing) {
		return (
			<div className='wrapper'>
				<div className='main'>
					<div className={styles.person}>
							<h1 >Edit Employee: {employee.name}
							</h1>
							{saveMessage && <div className={styles.saveMessage}>{saveMessage}</div>}
							{saveError && <div style={{ color: "red" }}>{saveError}</div>}
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

			<IconButton
				aria-label="delete"
				onClick={openDialog}
				sx={{
					color: "#4ca9ca",
					transition: "all 0.3s ease", 
					"&:hover": {
						color: "red", 
						backgroundColor: "rgba(255, 0, 0, 0.1)"}
				}}>
				<DeleteIcon />
			</IconButton>

			<IconButton
				aria-label="return"
				onClick={() => navigate("/table")}
				sx={{
					color: "#4ca9ca",
					transition: "all 0.3s ease",
					position: "absolute",
					top: "10px",
					right: "10px",
					"&:hover": {
						color: "#4ca9ca",
						backgroundColor: "rgba(2, 2, 2, 0.1)",
					},
				}}
				>
				<KeyboardReturnIcon />
			</IconButton>

		</div>
		
	 </div>
	 </div>
	 </div>
  );
};

PersonCard.propTypes = {
	handleDeleteEmployee: PropTypes.func.isRequired,
};

export default PersonCard;
