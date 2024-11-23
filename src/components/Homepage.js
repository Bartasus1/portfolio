import Icon from './Icon';
import '../style/Homepage.css';

function Homepage() {
	const TypeHomepage = 'Homepage';
	const scrollToSection = id => {
		const section = document.getElementById(id);
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' });
		}
	};
	return (
		<div className='Home' id='HomePageID'>
			<nav>
				<div id='navBar'>
					<ul>
						<li onClick={() => scrollToSection('AboutMe')}>About Me</li>
						<li onClick={() => scrollToSection('TimeLineExpArea')}>Experience & Education</li>
						<li onClick={() => scrollToSection('Projects')}>Projects</li>
					</ul>
				</div>
				<div id='Icons'>
					<div style={{ float: 'right', paddingRight: '2%' }}>
						<Icon
							link='https://www.linkedin.com/in/bart%C5%82omiej-bana%C5%9B-a43361206/'
							icon='fab fa-linkedin-in'
							name='LinkedIn'
							type={TypeHomepage}
						/>
						<Icon link='https://github.com/Bartasus1' icon='fab fa-github' name='GitHub' type={TypeHomepage} />
						<Icon
							link='https://www.facebook.com/people/Bart%C5%82omiej-Bana%C5%9B/100004063323294/'
							icon='fab fa-facebook'
							name='Facebook'
							type={TypeHomepage}
						/>
						<Icon
							link='https://steamcommunity.com/profiles/76561198244377476/'
							icon='fab fa-steam'
							name='Steam'
							type={TypeHomepage}
						/>
					</div>
				</div>
			</nav>

			<h1 id='Name1'>Bartłomiej</h1>
			<h1 id='Name2'>Banaś</h1>
			<div id='TitleName'>
				<h2>| Gameplay & UI Programmer |</h2>
				<h2>| Unreal Engine |</h2>
			</div>
		</div>
	);
}

export default Homepage;

/*
<h1 id="Name">Bartłomiej Banaś</h1>
            <div id= "Icons">
                <Icon link = "https://www.linkedin.com/in/bart%C5%82omiej-bana%C5%9B-a43361206/" icon = "fab fa-linkedin" name = "LinkedIn" type="Homepage" />
                <Icon link = "https://github.com/Bartasus1" icon = "fab fa-github" name = "GitHub" type="Homepage"/>
                <Icon link = "https://www.facebook.com/people/Bart%C5%82omiej-Bana%C5%9B/100004063323294/" icon="fab fa-facebook" name = "Facebook" type="Homepage"/>
                <Icon link = "https://steamcommunity.com/profiles/76561198244377476/" icon = "fab fa-steam" name = "Steam" type="Homepage"/>
            </div>
*/
