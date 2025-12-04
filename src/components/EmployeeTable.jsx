import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Tooltip,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@mui/material";

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';

// ---------------------- Colors for departments ----------------------
const departmentColors = {
  IT: '#AED581',
  Design: '#FFB74D',
  Sales: '#64B5F6',
  Marketing: '#BA68C8',
  Finance: '#E57373'
};

export default function EmployeeTableWithFilters({ handleDeleteEmployee }) {
  const { get, patch } = useAxios();
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------- Confirm Delete Dialog ----------------
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const openDialog = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const closeDialog = () => setOpen(false);

  const confirmDelete = () => {
    handleDeleteEmployee(selectedId, navigate);
    closeDialog();
  };

  // ---------------- Filters ----------------
  const [filterName, setFilterName] = useState("");
  const [filterTitle, setFilterTitle] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterSalary, setFilterSalary] = useState("");

  // ---------------- Fetch employees ----------------
  useEffect(() => {
    get("/employees")
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [get]);

  // ---------------- Toggle Favorite ----------------
  const toggleFavorite = (id) => {
    const emp = employees.find(e => e.id === id);
    if (!emp) return;

    patch(`/employees/${id}`, { favorite: !emp.favorite })
      .then((res) => {
        setEmployees(prev =>
          prev.map(e => e.id === id ? { ...e, favorite: res.data.favorite } : e)
        );
      });
  };

  // ---------------- Filtering ----------------
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp =>
      emp.name.toLowerCase().includes(filterName.toLowerCase()) &&
      emp.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
      emp.department.toLowerCase().includes(filterDepartment.toLowerCase()) &&
      emp.location.toLowerCase().includes(filterLocation.toLowerCase()) &&
      (filterSalary === "" || emp.salary.toString().includes(filterSalary))
    );
  }, [employees, filterName, filterTitle, filterDepartment, filterLocation, filterSalary]);

  if (loading) return <div>Loading...</div>;
  if (!employees.length) return <div>No employees found.</div>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Employee Dashboard
      </Typography>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <TextField label="Filter Name" variant="outlined" size="small" value={filterName} onChange={e => setFilterName(e.target.value)} />
        <TextField label="Filter Title" variant="outlined" size="small" value={filterTitle} onChange={e => setFilterTitle(e.target.value)} />
        <TextField label="Filter Department" variant="outlined" size="small" value={filterDepartment} onChange={e => setFilterDepartment(e.target.value)} />
        <TextField label="Filter Location" variant="outlined" size="small" value={filterLocation} onChange={e => setFilterLocation(e.target.value)} />
        <TextField label="Filter Salary" variant="outlined" size="small" value={filterSalary} onChange={e => setFilterSalary(e.target.value)} />
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ maxHeight: 600, borderRadius: 2 }}>
        <Table stickyHeader aria-label="employee table">

          <TableHead>
            <TableRow>
              <TableCell sx={{ background: "var(--primary-color)", color: "white", fontWeight: 700 }}>Favorite</TableCell>
              <TableCell sx={{ background: "var(--primary-color)", color: "white", fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ background: "var(--primary-color)", color: "white", fontWeight: 700 }}>Title</TableCell>
              <TableCell align="right" sx={{ background: "var(--primary-color)", color: "white", fontWeight: 700 }}>
                Salary (€)
              </TableCell>
              <TableCell sx={{ background: "var(--primary-color)", color: "white", fontWeight: 700 }}>Department</TableCell>
              <TableCell sx={{ background: "var(--primary-color)", color: "white", fontWeight: 700 }}>Location</TableCell>
              <TableCell sx={{ background: "var(--primary-color)", color: "white", fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredEmployees.map(emp => (
              <TableRow
                key={emp.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  bgcolor: emp.favorite ? 'rgba(255, 223, 0, 0.12)' : 'inherit',
                  '&:hover': { backgroundColor: 'rgba(76, 169, 202, 0.08)' }
                }}
              >
                {/* Favorite */}
                <TableCell>
                  <Tooltip title={emp.favorite ? "Unmark Favorite" : "Mark as Favorite"}>
                    <IconButton onClick={() => toggleFavorite(emp.id)}>
                      {emp.favorite ? <StarIcon color="warning" /> : <StarBorderIcon />}
                    </IconButton>
                  </Tooltip>
                </TableCell>

                {/* Name */}
                <TableCell>{emp.name}</TableCell>

                {/* Title */}
                <TableCell>{emp.title}</TableCell>

                {/* Salary */}
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: emp.salary > 4000 ? 700 : 400,
                    color: emp.salary > 4000 ? "green" : "inherit"
                  }}
                >
                  {emp.salary}
                </TableCell>

                {/* Department */}
                <TableCell>
                  <Box sx={{
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    backgroundColor: departmentColors[emp.department] || 'grey',
                    color: '#fff',
                    fontWeight: 600,
                    textAlign: 'center',
                    display: 'inline-block'
                  }}>
                    {emp.department}
                  </Box>
                </TableCell>

                {/* Location */}
                <TableCell>{emp.location}</TableCell>

                {/* Actions */}
                <TableCell>
                  <Tooltip title="View Details">
                    <IconButton
                      onClick={() => navigate(`/employees/${emp.id}`)}
                      sx={{ color: '#4ca9ca' }}
                    >
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete Employee">
                    <IconButton
                      onClick={() => openDialog(emp.id)}
                      sx={{
                        color: "#4ca9ca",
                        transition: "0.2s",
                        "&:hover": {
                          color: "red",
                          backgroundColor: "rgba(255,0,0,0.1)"
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>

        {/* Confirm Delete Dialog */}
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

      </TableContainer>
    </Box>
  );
}
