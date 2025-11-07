import { useState } from "react";
import styles from "./EmployeeForm.module.css";

function EmployeeForm ({ onSubmit }) {
	const [formData, setFormData] = useState ({
	 firstName: "",
  	 lastName: "",
    title: "",
    salary: "",
    phone: "",
    email: "",
    animal: "",
    startDate: "",     // очікуємо формат YYYY-MM-DD (input type="date")
    location: "",
    department: "",
    skills: "",         // користувач вводить "HTML, CSS, JS" — ми перетворимо в масив
	})

	const [errorMessage, setErrorMessage] = useState("")
	// показуємо підсвітку тільки після спроби сабміту
	const [touched, setTouched] = useState(false); 


  // Єдина функція onChange для всіх input.
  // Використовуємо e.target.name щоб оновити конкретне поле.
	function handleChange(e){
		const {name, value} = e.target
		setFormData(prev=>({
			...prev,
			[name]:value
		}))
	}

 // Обробка сабміту форми
	const handleSubmit = (e) => {
		e.preventDefault();

	
		setTouched(true); // 🟡 активуємо підсвітку

		// 🔎 Список обов’язкових полів
		const requiredFields = ["firstName", "lastName", "title", "email", "startDate", "salary", "phone", "animal", "location", "department", "skills"];
  
		// Перевіряємо, чи є хоч одне порожнє
		const emptyFields = requiredFields.filter(
			(field) => !((formData[field] || "").trim())
		 );
  
		if (emptyFields.length > 0) {
		  setErrorMessage("Please fill in all required fields.");
		  return;
		}
  
		setErrorMessage("");
		
	// Побудова об'єкта співробітника:
    // - id: Date.now() -> швидкий унікальний id (зазвичай для demo достатньо)
    // - salary: приводимо до числа
    // - skills: перетворюємо рядок в масив, обрізаємо пробіли

	 const newEmployee = {
		id: Date.now(),
		name: formData.firstName.trim() + " " + formData.lastName.trim(),
		title: formData.title.trim(),
      salary: formData.salary === "" ? 0 : Number(formData.salary),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      animal: formData.animal.trim(),
      startDate: formData.startDate, // зберігаємо як рядок "YYYY-MM-DD"
      location: formData.location.trim(),
      department: formData.department.trim(),
		skills: formData.skills
        .split(",")                  // розділяємо по комі
        .map(s => s.trim())         // обрізаємо пробіли
        .filter(s => s.length > 0)  // відкидаємо пусті значення 
	 }

	 // Викликаємо callback, який передала сторінка (AddEmployee або батьківський компонент)
    // onSubmit очікує отримати повністю сформований об'єкт співробітника
    if (typeof onSubmit === "function") {
      onSubmit(newEmployee);
    }

	 // (Опціонально) Очищуємо форму після відправки:
    setFormData({
      firstName: "",
		lastName: "",
      title: "",
      salary: "",
      phone: "",
      email: "",
      animal: "",
      startDate: "",
      location: "",
      department: "",
      skills: ""
    });

	 setTouched(false); // скидаємо підсвітку
	}

// функція для перевірки, чи потрібно підсвічувати поле
const isInvalid = (field) => touched && !formData[field].trim();

return (
	<div className={styles.formContainer}>
		<form className={styles.addPersonForm} onSubmit={handleSubmit}>
			<h2 className={styles.title}>Add new employee</h2>

			<div>
				<label className={styles.label} htmlFor="firstName">First Name:
					<input 
						id="firstName" 
						name="firstName" 
						value={formData.firstName}
						onChange={handleChange}
						placeholder="First Name"
						className={isInvalid("firstName") ? styles.invalid : ""} 
					/>
				</label>
			</div>

			<div>
				<label className={styles.label} htmlFor="lastName">Last Name:
					<input 
						id="lastName" 
						name="lastName" 
						value={formData.lastName}
						onChange={handleChange}
						placeholder="Last Name" 
						className={isInvalid("lastName") ? styles.invalid : ""}
					/>
				</label>
			</div>

			<div>
				<label className={styles.label} htmlFor="title">Title:
					<input 
						id="title" 
						name="title" 
						value={formData.title}
						onChange={handleChange}
						placeholder="Job Tittle"
						className={isInvalid("title") ? styles.invalid : ""} 
					/>
				</label>
			</div>

			<div>
				<label className={styles.label} htmlFor="salary">Salary:
					<input 
						id="salary"
						name="salary"  
						value={formData.salary} 
						onChange={handleChange} 
						placeholder="Monthly Salary"
						className={isInvalid("salary") ? styles.invalid : ""}
					/>
				</label>
			</div>

			<div>
				<label className={styles.label} htmlFor="phone">Phone:
					<input 
						id="phone"
						name="phone"  
						value={formData.phone} 
						onChange={handleChange} 
						placeholder="Phone number"
						className={isInvalid("phone") ? styles.invalid : ""}
					/>
				</label>
			</div>

			<div>
				<label className={styles.label} htmlFor="email">Email:
					<input 
						id="email"
						name="email" 
						type="email" 
						value={formData.email} 
						onChange={handleChange} 
						placeholder="Email address"
						className={isInvalid("email") ? styles.invalid : ""}
					/>
				</label>
			</div>

			<div>
				<label className={styles.label} htmlFor="animal">Favorite Animal
					<input 
						id="animal"
						name="animal" 
						value={formData.animal} 
						onChange={handleChange} 
						placeholder="e.g. Owl" 
						className={isInvalid("animal") ? styles.invalid : ""}
					/>
				</label>
			</div>

			<div>
				<label className={styles.label} htmlFor="startDate">Start Date:
					<input 
						id="startDate"
						name="startDate" 
						type="date" 
						value={formData.startDate} 
						onChange={handleChange}
						placeholder="YYYY-MM-DD" 
						className={isInvalid("startDate") ? styles.invalid : ""}
					/>
				</label>
			</div>

			<div>
				<label className={styles.label} htmlFor="location">Location:
					<input 
						id="location"
						name="location" 
						value={formData.location} 
						onChange={handleChange} 
						placeholder="City" 
						className={isInvalid("location") ? styles.invalid : ""}
					/>
				</label>
			</div>

			<div>
				<label className={styles.label} htmlFor="department">Department:
					<input 
						id="department"
						name="department" 
						value={formData.department} 
						onChange={handleChange} 
						placeholder="Department" 
						className={isInvalid("department") ? styles.invalid : ""}
					/>
				</label>
			</div>

			<div>
				<label className={styles.label} htmlFor="skills">Skills:
					<input 
						id="skills"
						name="skills" 
						value={formData.skills} 
						onChange={handleChange} 
						placeholder="e.g. React, CSS, SQL" 
						className={isInvalid("skills") ? styles.invalid : ""}
					/>
				</label>
			</div>

			{errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

			<div className={styles.buttonWrapper}>
				<button 
					className={styles.button} 
					type='submit'>Save Employee
				</button>
			</div>

		</form>
		
		
	</div>
);
}

export default EmployeeForm