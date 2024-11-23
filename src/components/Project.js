import React, { useState } from 'react'; // Dodanie useState
import Icon from './Icon'; // Import Icon
import '../style/Project.css'; // Import stylu
function Project(props) {
	const Json = props.json;

	// Generowanie linków na podstawie danych JSON
	const Links = Json.links.map(Link => (
		<Icon key={Link.name} link={Link.link} icon={Link.icon} name={Link.name} type='ProjectIcon' />
	));

	// Używamy stanu, aby zarządzać widocznością ProjectInfoOverlay
	const [isOverlayVisible, setIsOverlayVisible] = useState(false);

	const toggleOverlay = () => {
		const newVisibility = !isOverlayVisible;
		setIsOverlayVisible(newVisibility); // Zmiana stanu widoczności
		props.onOverlayToggle(newVisibility); // Powiadomienie komponentu nadrzędnego
	};

	return (
		<div className='Project'>
			{/* Overlay z kontrolowaną widocznością */}
			<div id='ProjectInfoOverlay' style={{ display: isOverlayVisible ? 'block' : 'none' }}>
				<div id='offOverlayBuutton' onClick={toggleOverlay}>
					<strong id='jedenX'></strong>
					<strong id='dwaX'></strong>
				</div>
				<div id='Title'>
					<p className='SectionName'>{Json.title}</p>
					<p id='Engine'>{Json.engine}</p>
				</div>
				<div className='InfoCellWrapper'>
					<div className='SectionName InfoCell'>
						<p>Rola w projekcie</p>
					</div>
					<div className='SectionInfo'>
						<p id='MyRole'>
							{Json.role.job} <br />
							{Json.role.where}
						</p>
					</div>
				</div>

				<div className='InfoCellWrapper'>
					<div className='SectionName InfoCell'>
						<p>Linki zewnętrzne</p>
					</div>
					<div className='SectionInfo' id='LinksInfo'>
						<div id='Links'>{Links}</div>
					</div>
				</div>
				<div className='LongRowOverlay'>
					<p id='Description'>{Json.description}</p>
				</div>
			</div>

			<div id='ImageFrame'>
				<img src={require(`../photos/projects/${props.json.image}`)} alt={props.json.title} />
			</div>

			<div className='LongRow'>
				<div id='Title'>
					<p className='SectionName'>{Json.title}</p>
					<div className='SectionInfo' id='LinksInfo'>
						<div id='Links'>{Links}</div>
					</div>
				</div>
				<p id='Description'>{Json.description}</p>

				{/* Przycisk otwierający overlay */}
				<div id='zobaczWiecejButton'>
					<button onClick={toggleOverlay}>More</button>
				</div>
			</div>
		</div>
	);
}

export default Project;
