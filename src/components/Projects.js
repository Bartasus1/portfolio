import React from "react";
import Project from "./Project";
import "../style/Projects.css";

import KrzyweKarty from "../Projects/KrzyweKarty.json";
import KrzyweKartyImage from "../photos/game_photos/KrzyweKarty.jpg";

import CocoJumpo from "../Projects/CocoJumpo.json";
import CocoJumpoImage from "../photos/game_photos/Cocojumpo.jpg"

let i = 0;

class Projects extends React.Component
{

    state = {
        CurrentProject : [KrzyweKarty, KrzyweKartyImage]
    }

    render ()
    {

        const ProjectsArray =  [
            [KrzyweKarty, KrzyweKartyImage],
            [CocoJumpo, CocoJumpoImage]
        ]

        const SwitchLeft = () => {
            var x = i;
            if(x <= 0)
            {
                x = ProjectsArray.length - 1;
            }
            else
            {
                x -= 1;
            }
            i = x;
            this.setState({CurrentProject: ProjectsArray[i]})
        }

        const SwitchRight = () => {
            var x = i;
            if(x >= ProjectsArray.length - 1)
            {
                x = 0;
            }
            else
            {
                x += 1
            }
            i = x;
            this.setState({CurrentProject : ProjectsArray[i]});
        }


        return (
        <div id="Projects">
            <div id="LeftButtonDiv">
                <button id="LeftButton" onClick={SwitchLeft}>
                    <i id="LeftIcon" className=" fas fa-arrow-circle-left"></i>
                </button>
            </div>
            < Project json = {this.state.CurrentProject[0]} image = {this.state.CurrentProject[1]} />
            <div id="RightButtonDiv">
                <button id="RightButton" onClick={SwitchRight}>
                    <i id="RightIcon" className="fas fa-arrow-circle-right"></i>
                </button>
            </div>
        </div>
        )
    }
}

export default Projects;