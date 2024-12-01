import '../style/TimeLineExp.css';
import Timeline from "timelinejs-react";

const timeline_json = require("../data/Timeline.json")
const options  = {
	timenav_position: "top",
	hash_bookmark: true,
	initial_zoom: 0.7,
	scale_factor: 0.7,
	debug: true,
	default_bg_color: "black",
	start_at_end: true
}

function TimeLineExp() {

	return (
		<div id='TimeLineExpArea'>
			<Timeline
			target={<div className="timeline" style={{ height: 1080 }} />}
			events={timeline_json.events}
			title={timeline_json.events[0]}
			options={options}
			/>
		</div>
	);
}

export default TimeLineExp;
