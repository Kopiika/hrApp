import styles from './Header.module.css';
import { NavLink } from "react-router-dom";

const Header = () => {
	return (
	  <header className={styles.header}>
		 <h1 className={styles.logo}>HR App</h1>
		 <nav className={styles.navMenu}>

			<NavLink 
			to="/" 
			className={({isActive}) => 
				`${styles.link} ${isActive ? styles.active : ""}`
			} end
			>Home
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
	  </header>
	);
 };
 
 export default Header;