import styles from './Person.module.css';

const Person = (props) => {
	return (
	<div className={styles.person}> 
		<h2 className={styles.name}>{props.name}</h2>
		<div className={styles.title}>Title: {props.title}</div>
		<div className={styles.salary}>Salary: {props.salary}</div> 
		<div className={styles.phone}>Phone: {props.phone}</div>
		<div className={styles.email}>Email: {props.email}</div>
		<div className={styles.animal}>Animal: {props.animal}</div>
	</div>
	);
}

export default Person