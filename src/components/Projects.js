import React from 'react';
import Project from './Project';
import '../style/Projects.css';
import ProjectsData from '../data/Projects.json';

class Projects extends React.Component {
	state = {
		currentProjectIndex: 0, // Aktualny indeks projektu
		isAnimating: true, // Flaga kontrolująca animację
		isOverlayVisible: false, // Flaga kontrolująca widoczność overlayu
		timer: null, // Timer
	};

	componentDidMount() {
		this.startAutoSwitch();
	}

	componentWillUnmount() {
		clearInterval(this.state.timer); // Usunięcie timera przy odmontowywaniu
	}

	startAutoSwitch = () => {
		this.setState({
			timer: setInterval(() => {
				this.handleNextProject();
			}, 8200),
		});
	};

	pauseAutoSwitch = () => {
		clearInterval(this.state.timer); // Wstrzymanie timera
		this.setState({ isAnimating: false }); // Zatrzymanie animacji
	};

	resumeAutoSwitch = () => {
		this.setState({ isAnimating: true }); // Wznowienie animacji
		this.startAutoSwitch(); // Ponowne uruchomienie timera
	};

	handleNextProject = () => {
		this.setState(prevState => ({
			currentProjectIndex: (prevState.currentProjectIndex + 1) % ProjectsData.length, // Przejście do kolejnego projektu
		}));
	};

	handleProjectChange = index => {
		if (this.state.isOverlayVisible) return; // Blokowanie kliknięcia, gdy overlay jest widoczny
		clearInterval(this.state.timer); // Reset timera
		this.setState({ isAnimating: false }, () => {
			// Zresetuj animację i przełącz projekt
			this.setState({ currentProjectIndex: index, isAnimating: true });
		});
		this.startAutoSwitch(); // Ponowne uruchomienie automatycznego przełączania
	};

	handleOverlayToggle = isVisible => {
		this.setState({ isOverlayVisible: isVisible }, () => {
			// Jeśli overlay jest widoczny, zatrzymaj timer i animację
			if (isVisible) {
				this.pauseAutoSwitch();
			} else {
				this.resumeAutoSwitch(); // Wznów timer i animację, gdy overlay zostanie zamknięty
			}
		});
	};

	render() {
		const { currentProjectIndex, isAnimating, isOverlayVisible } = this.state;

		return (
			<div id='Projects'>
				<div
					id='SwitchProjectsButtons'
					className={isOverlayVisible ? 'disabled' : ''} // Dodanie klasy 'disabled', gdy overlay jest widoczny
				>
					{/* Dynamically render buttons based on JSON data */}
					{ProjectsData.map((project, index) => (
						<div
							key={index}
							className={`ProjectIconContainer ${isAnimating && index === currentProjectIndex ? 'animate' : ''}`}
							onClick={() => this.handleProjectChange(index)}>
							<div className='progress-bar'></div>
							<div className='ProjectName'>
								<h3>{project.title}</h3>
							</div>
						</div>
					))}
				</div>

				{/* Wyświetlanie aktywnego projektu */}
				<Project
					json={ProjectsData[currentProjectIndex]}
					onOverlayToggle={this.handleOverlayToggle} // Przekazywanie funkcji do obsługi widoczności overlayu
				/>
			</div>
		);
	}
}

export default Projects;
