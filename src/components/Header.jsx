import styles from './Header.module.css';
import { NavLink } from "react-router-dom";
import { Typography, Box } from "@mui/material";

const Header = () => {
	return (
	  <Box className={styles.header}>
		 <Typography variant='h5' className={styles.logo}>HR App</Typography>
		 <nav className={styles.navMenu}>

			<NavLink 
			to="/" 
			className={({isActive}) => 
				`${styles.link} ${isActive ? styles.active : ""}`
			} end
			>Home
			</NavLink> 

			<NavLink
          to="/table"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          Employees table
        </NavLink>

			<NavLink
          to="/add"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          Add Employee
        </NavLink>

			 <NavLink
			 to="/about"
				className={({ isActive }) =>
					`${styles.link} ${isActive ? styles.active : ""}`
				}
			>
				About
			 </NavLink>
			
	    </nav>
	  </Box>
	);
 };
 
 export default Header;