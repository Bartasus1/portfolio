import Homepage from "./Homepage";
import AboutMe from "./AboutMe";
import Projects from "./Projects";

import "../style/Portfolio.css";

function Portfolio()
{
    return (
        <div id="Portfolio">
            <Homepage />
            <AboutMe />
            <Projects />

        </div>
    )
}
//
// <AboutMe/>
export default Portfolio;