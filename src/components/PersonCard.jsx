import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useYearsWorked } from "../hooks/useYearsWorked";
import Emoji from "./Emoji";
import useAxios from "../hooks/useAxios";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import EuroOutlinedIcon from "@mui/icons-material/EuroOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

const AVATAR_PALETTE = [
  "#3b82f6", "#8b5cf6", "#0891b2", "#059669",
  "#d97706", "#dc2626", "#db2777", "#475569",
];
const getAvatarColor = (name = "") =>
  AVATAR_PALETTE[(name.charCodeAt(0) ?? 0) % AVATAR_PALETTE.length];
const getInitials = (name = "") =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

const PersonCard = ({ handleDeleteEmployee }) => {
  const { get, patch } = useAxios();
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ salary: "", location: "", department: "", skills: "" });
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);
  const confirmDelete = () => { closeDialog(); handleDeleteEmployee(id, navigate); };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const handleSave = () => {
    patch(`/employees/${id}`, {
      salary: formData.salary,
      location: formData.location,
      department: formData.department,
      skills: formData.skills.split(",").map((s) => s.trim()),
    })
      .then((response) => {
        setEmployee(response.data);
        setSaveMessage("Changes saved!");
        setTimeout(() => { setSaveMessage(""); setIsEditing(false); }, 2000);
      })
      .catch(() => {
        setSaveError("Failed to save. Please try again.");
        setTimeout(() => setSaveError(""), 3000);
      });
  };

  useEffect(() => {
    get(`/employees/${id}`)
      .then((response) => {
        setEmployee(response.data);
        setFormData({
          salary: response.data.salary || "",
          location: response.data.location || "",
          department: response.data.department || "",
          skills: Array.isArray(response.data.skills) ? response.data.skills.join(", ") : "",
        });
      })
      .catch(() => setSaveError("Failed to load employee."))
      .finally(() => setLoading(false));
  }, [id, get]);

  const { reminder } = useYearsWorked(employee?.startDate);

  if (loading) return (
    <Box sx={{ p: 3, maxWidth: 660, mx: "auto" }}>
      <Skeleton variant="rectangular" height={96} sx={{ borderRadius: 2, mb: 2 }} />
      <Skeleton variant="rectangular" height={240} sx={{ borderRadius: 2 }} />
    </Box>
  );

  if (!employee) return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography color="text.secondary">Employee not found.</Typography>
    </Box>
  );

  if (saveError && !isEditing) return (
    <Alert severity="error" sx={{ m: 3 }}>{saveError}</Alert>
  );

  const infoItems = [
    { label: "Email", value: employee.email, icon: <MailOutlineIcon fontSize="small" /> },
    { label: "Phone", value: employee.phone, icon: <PhoneOutlinedIcon fontSize="small" /> },
    { label: "Location", value: employee.location, icon: <LocationOnOutlinedIcon fontSize="small" /> },
    { label: "Start date", value: employee.startDate, icon: <CalendarTodayOutlinedIcon fontSize="small" /> },
    { label: "Salary", value: `${employee.salary} €`, icon: <EuroOutlinedIcon fontSize="small" /> },
    { label: "Department", value: employee.department, icon: <WorkOutlineIcon fontSize="small" /> },
  ];

  if (isEditing) {
    return (
      <Box sx={{ maxWidth: 660, mx: "auto", mt: 3, px: 2 }}>
        <Card elevation={0}>
          <Box sx={{ px: 3, py: 2.5, borderBottom: "1px solid", borderColor: "divider" }}>
            <Typography variant="h6" fontWeight={600}>
              Edit: {employee.name}
            </Typography>
          </Box>
          <CardContent sx={{ p: 3 }}>
            {saveMessage && <Alert severity="success" sx={{ mb: 3 }}>{saveMessage}</Alert>}
            {saveError && <Alert severity="error" sx={{ mb: 3 }}>{saveError}</Alert>}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <TextField
                label="Salary (€)"
                name="salary"
                type="number"
                value={formData.salary}
                onChange={handleChange}
              />
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
              <TextField
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
              <TextField
                label="Skills (comma-separated)"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                helperText="e.g. React, TypeScript, Node.js"
              />
            </Box>
          </CardContent>
          <Box
            sx={{
              px: 3, pb: 3, pt: 2,
              display: "flex", gap: 1.5,
              borderTop: "1px solid", borderColor: "divider",
            }}
          >
            <Button variant="contained" onClick={handleSave} disableElevation>
              Save Changes
            </Button>
            <Button variant="outlined" color="inherit" onClick={toggleEdit}>
              Cancel
            </Button>
          </Box>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 660, mx: "auto", mt: 3, px: 2 }}>
      <Card elevation={0}>
        {/* Header — avatar + name + back button */}
        <Box
          sx={{
            px: 3, py: 3,
            display: "flex", alignItems: "flex-start", gap: 2.5,
            borderBottom: "1px solid", borderColor: "divider",
          }}
        >
          <Avatar
            sx={{
              bgcolor: getAvatarColor(employee.name),
              width: 56, height: 56,
              fontSize: "1.125rem", fontWeight: 600, flexShrink: 0,
            }}
          >
            {getInitials(employee.name)}
          </Avatar>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
              <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.3 }}>
                {employee.name}
              </Typography>
              <Emoji animal={employee.animal} size={18} />
            </Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {employee.title}
            </Typography>
            {employee.department && (
              <Chip
                label={employee.department}
                size="small"
                variant="outlined"
                sx={{ mt: 0.5, height: 22 }}
              />
            )}
          </Box>

          <IconButton
            aria-label="back"
            size="small"
            onClick={() => navigate(-1)}
            sx={{ color: "text.secondary", flexShrink: 0 }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
        </Box>

        <CardContent sx={{ p: 3 }}>
          {reminder && (
            <Alert
              severity={reminder.includes("🎉") ? "success" : "warning"}
              variant="outlined"
              sx={{ mb: 3, "& .MuiAlert-message": { fontSize: "0.875rem" } }}
            >
              {reminder}
            </Alert>
          )}

          {/* Info grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2.5,
            }}
          >
            {infoItems.map(({ label, value, icon }) => (
              <Box key={label} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                <Box sx={{ color: "text.secondary", mt: 0.25, flexShrink: 0 }}>{icon}</Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {label}
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {value}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Skills */}
          {Array.isArray(employee.skills) && employee.skills.length > 0 && (
            <>
              <Divider sx={{ my: 3 }} />
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  gutterBottom
                  sx={{ textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}
                >
                  Skills
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
                  {employee.skills.map((skill) => (
                    <Chip key={skill} label={skill} size="small" variant="outlined" />
                  ))}
                </Box>
              </Box>
            </>
          )}
        </CardContent>

        {/* Action bar */}
        <Box
          sx={{
            px: 3, py: 2,
            display: "flex", gap: 1.5,
            borderTop: "1px solid", borderColor: "divider",
          }}
        >
          <Button
            variant="outlined"
            size="small"
            startIcon={<EditOutlinedIcon />}
            onClick={toggleEdit}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            startIcon={<DeleteOutlineIcon />}
            onClick={openDialog}
          >
            Delete
          </Button>
        </Box>
      </Card>

      {/* Delete dialog */}
      <Dialog open={open} onClose={closeDialog} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 600 }}>Delete employee?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "0.875rem" }}>
            Are you sure you want to remove <strong>{employee.name}</strong>?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button variant="outlined" color="inherit" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="contained" color="error" disableElevation onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

PersonCard.propTypes = {
  handleDeleteEmployee: PropTypes.func.isRequired,
};

export default PersonCard;
