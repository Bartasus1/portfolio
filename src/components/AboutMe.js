import '../style/AboutMe.css';
import fire from '../photos/fire.png';

function AboutMe() {
	return (
		<div id='AboutMe'>
			<img src={fire} id='Fire' alt='Fire'></img>
			<div id='Text'>
				<h1>About Me</h1>
				<p>
					I’m a game developer with 5 years of experience, including 4 years in Unreal Engine and 15 months in a
					commercial setting. Proficient in both Blueprints and C++, focused on building clean and robust systems &
					mechanics. I’ve worked on a variety of personal projects and have taken on leadership roles in collaborative
					team efforts.
					<br />
					My goal is to continue growing as a game developer and deepen my expertise through professional opportunities.
				</p>
			</div>
		</div>
	);
}

export default AboutMe;
