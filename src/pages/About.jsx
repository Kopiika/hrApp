import {useNavigate} from "react-router"

 const About = () => {
	const navigate = useNavigate();
	const handleNavigate =()=>{
		navigate("/")
	}
	return (
		<div className="wrapper">
			<main className="main">
				<h1>About HR App</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
				Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
				<button className="button" onClick={handleNavigate}>Return to Home</button>
			</main>
		</div>
	);
 }

 export default About