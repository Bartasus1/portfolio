import '../style/TimeLineExp.css';
import Timeline from 'timelinejs-react';
import { useEffect } from 'react';

const timeline_json = require('../data/Timeline.json');

const options = {
	timenav_position: 'top',
	timenav_height_percentage: 25, // Ustaw procentową wysokość
	timenav_height_min: 50, // Minimalna wysokość osi czasu
	timenav_height: 100,
	hash_bookmark: true,
	initial_zoom: 0.7,
	scale_factor: 0.7,
	debug: true,
	default_bg_color: 'black',
	start_at_end: true,
	default_bg_color: 'rgba(20, 20, 20, 1)',
};

function TimeLineExp() {
	useEffect(() => {
		const interval = setInterval(() => {
			const timelineNav = document.querySelector('.tl-timenav');
			const timelineContainer = document.querySelector('.timeline');

			if (timelineNav && timelineContainer) {
				timelineContainer.prepend(timelineNav);
				clearInterval(interval); // Przestań próbować po sukcesie
			}
		}, 500); // Próba co 500ms
		console.log(options);
		return () => clearInterval(interval); // Wyczyść interwał przy unmount
	}, []);

	return (
		<div id='TimeLineExpArea'>
			<Timeline
				target={<div className='timeline' style={{ height: 1080 }} />}
				events={timeline_json.events}
				title={timeline_json.events[0]}
				options={options}
			/>
		</div>
	);
}

export default TimeLineExp;
