import styles from './Footer.module.css';
import { Typography, Box } from "@mui/material";

const Footer = () => {
	return (
	  <Box className={styles.footer}>
		 <Typography variant="body2">&copy; WP25K</Typography>
	  </Box>
	);
 };
 
 export default Footer;