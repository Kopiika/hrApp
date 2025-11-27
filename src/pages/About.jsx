import {useNavigate} from "react-router"
import styles from "./About.module.css";

 const About = () => {
	const navigate = useNavigate();
	const handleNavigate =()=>{
		navigate("/")
	}
	return (
		<div className="wrapper">
			<main className="main">
				<div className={styles.aboutPage}>
					<h1>About HR App</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
					Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
				
					<p>Hac duis hendrerit ultricies fringilla nam in vestibulum a. Tellus pulvinar tortor odio senectus euismod fusce in nibh massa elit iaculis. Facilisis gravida ornare aliquet mauris venenatis semper nisl. Pulvinar libero ultrices porttitor nibh fames viverra rhoncus neque blandit metus pellentesque lacus. Tellus adipiscing lacinia netus ultrices dictum cursus.</p>
					<p>
					Porta bibendum arcu tempus egestas accumsan pharetra velit facilisis et etiam. Lobortis platea mauris congue tincidunt penatibus ornare erat ipsum lectus nunc molestie. Ipsum metus eros mollis mauris eget suspendisse tempor. Dictumst laoreet sed semper tempus scelerisque commodo non donec mi erat. Dolor diam libero donec condimentum phasellus molestie varius tincidunt tincidunt risus fusce. Enim sed nullam orci sodales felis habitasse tellus senectus egestas augue sem. Id pulvinar cum varius pulvinar sagittis fringilla congue pharetra adipiscing?</p>
					<p>
					Est nisl porttitor mollis et tristique ac feugiat platea lorem iaculis elit hendrerit? Sit neque aenean lectus ridiculus sem urna fames. Quis amet euismod ut pellentesque maecenas tristique elit adipiscing. Habitant mattis fermentum, mollis dignissim malesuada felis venenatis. Habitant neque vivamus penatibus morbi consectetur arcu orci nullam penatibus fermentum. Etiam integer placerat egestas faucibus mauris cras ultrices lobortis a, dui iaculis vivamus. Quisque eleifend scelerisque consectetur scelerisque convallis vel netus.</p>
					<div className={styles.buttonContainer}>
						<button className="navButton" onClick={handleNavigate}>Return to Home</button>
					</div>
				</div>
			</main>
		</div>
	);
 }

 export default About