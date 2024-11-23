import Homepage from './Homepage';
import AboutMe from './AboutMe';
import Projects from './Projects';
import TimeLineExp from './TimeLineExp';

import '../style/Portfolio.css';

function Portfolio() {
	return (
		<div id='Portfolio'>
			<Homepage />
			<AboutMe />
			<TimeLineExp />
			<Projects />
		</div>
	);
}

export default Portfolio;
