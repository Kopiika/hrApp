import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const navItems = [
  { label: "Employees", to: "/", end: true },
  { label: "Table view", to: "/table" },
  { label: "Add Employee", to: "/add" },
  { label: "About", to: "/about" },
];

const Header = () => {
  return (
    <AppBar position="static" component="header">
      <Toolbar sx={{ px: { xs: 2, md: 4 }, gap: 4, minHeight: "60px !important" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PeopleAltOutlinedIcon sx={{ color: "primary.main", fontSize: 20 }} />
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, color: "text.primary", letterSpacing: "-0.02em" }}
          >
            HR App
          </Typography>
        </Box>

        <Box component="nav" sx={{ display: "flex", gap: 0.5 }}>
          {navItems.map(({ label, to, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
