import styles from './PersonCard.module.css';
import { Icon } from "@iconify/react";

const PersonCard = ({ employee }) => {
  // Parse the start date string into a Date object
  const start = new Date(employee.startDate);
  const today = new Date();

  // Calculate difference in years (including months for precision)
  const yearsWorked = today.getFullYear() - start.getFullYear();
  const hasHadAnniversary =
	 today.getMonth() > start.getMonth() ||
	 (today.getMonth() === start.getMonth() &&
		today.getDate() >= start.getDate());
  const totalYears = hasHadAnniversary ? yearsWorked : yearsWorked - 1;

  // Calculate months difference for more precise checks
  const monthsWorked =
	 (today.getFullYear() - start.getFullYear()) * 12 +
	 (today.getMonth() - start.getMonth());

  //Add conditional reminders
  let reminder = null;
  if (totalYears > 0 && totalYears % 5 === 0) {
	 // Exactly 5, 10, 15, etc. years
	 reminder = (
		<div className={styles.reminder}>
		  <p>
			 🎉 Schedule recognition meeting. Anniversary - {yearsWorked} years!
		  </p>
		</div>
	 );
  } else if (monthsWorked < 6) {
	 // Less than 6 months
	 reminder = (
		<div className={styles.reminder}>
		  <p>🔔 Schedule probation review.</p>
		</div>
	 );
  }

  //Map animal names to emojis (Iconify: npm install @iconify/react)
  function getAnimalEmoji(animalName) {
	 const map = {
		Owl: "🦉",
		Cat: "🐱",
		Dog: "🐶",
		Fox: "🦊",
		Bear: "🐻",
		Tiger: "🐯",
		Elephant: "🐘",
		Lion: "🦁",
		Rabbit: "🐰",
		Dolphin: "🐬",
		Penguin: "🐧",
		Horse: "🐴",
		Raven: "🐦‍⬛",
	 };

	 if (map[animalName]) {
		return map[animalName];
	 }

	 try {
		return (
		  <Icon
			 icon={`twemoji:${animalName.toLowerCase()}`}
			 width="24"
			 height="24"
		  />
		);
	 } catch {
		return animalName;
	 }
  }

  return (
	 <div className={styles.person}>
		<h2 className={styles.name}>
		  {employee.name} {getAnimalEmoji(employee.animal)}
		</h2>
		<p className={styles.title}>
		  <span>Title:</span> {employee.title}
		</p>
		<p className={styles.salary}>Salary: {employee.salary}</p>
		<p className={styles.phone}>Phone: {employee.phone}</p>
		<p className={styles.email}>Email: {employee.email}</p>
		<p className={styles.animal}>
		  Favorite Animal: {getAnimalEmoji(employee.animal)} ({employee.animal})
		</p>
		<p>Start Date: {employee.startDate}</p>
		<p>Location: {employee.location}</p>
		<p>Department: {employee.department}</p>
		<p>Skills: {employee.skills.join(", ")}</p>
		{reminder}
	 </div>
  );
};

export default PersonCard;
