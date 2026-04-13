import { useState } from "react";
import PropTypes from "prop-types";
import { Alert, Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";

function EmployeeForm({ onSubmit }) {
  const [formData, setFormData] = useState({
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
    skills: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);

    const requiredFields = [
      "firstName",
      "lastName",
      "title",
      "email",
      "startDate",
      "salary",
      "phone",
      "animal",
      "location",
      "department",
      "skills",
    ];

    const emptyFields = requiredFields.filter((field) => !((formData[field] || "").trim()));

    if (emptyFields.length > 0) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setErrorMessage("");

    const newEmployee = {
      id: Date.now().toString(),
      name: formData.firstName.trim() + " " + formData.lastName.trim(),
      title: formData.title.trim(),
      salary: formData.salary === "" ? 0 : Number(formData.salary),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      animal: formData.animal.trim(),
      startDate: formData.startDate,
      location: formData.location.trim(),
      department: formData.department.trim(),
      skills: formData.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
    };

    if (typeof onSubmit === "function") {
      onSubmit(newEmployee);
    }

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
      skills: "",
    });

    setTouched(false);
  };

  const isInvalid = (field) => touched && !formData[field].trim();

  return (
    <Card elevation={0} sx={{ maxWidth: 600, mx: "auto" }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" component="h2" fontWeight={600} sx={{ mb: 3 }}>
          Add new employee
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {[
            { label: "First Name", name: "firstName" },
            { label: "Last Name", name: "lastName" },
            { label: "Title", name: "title" },
            { label: "Salary", name: "salary", type: "number" },
            { label: "Phone", name: "phone" },
            { label: "Email", name: "email", type: "email" },
            { label: "Favorite Animal", name: "animal" },
            { label: "Start Date", name: "startDate", type: "date" },
            { label: "Location", name: "location" },
            { label: "Department", name: "department" },
            { label: "Skills (comma-separated)", name: "skills" },
          ].map(({ label, name, type }) => (
            <TextField
              key={name}
              label={label}
              name={name}
              type={type || "text"}
              value={formData[name]}
              onChange={handleChange}
              fullWidth
              error={isInvalid(name)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          ))}

          {errorMessage && (
            <Alert severity="error" variant="outlined">{errorMessage}</Alert>
          )}

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <Button type="submit" variant="contained" disableElevation>
              Save Employee
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

EmployeeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default EmployeeForm;
