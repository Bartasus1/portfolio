import Icon from "./Icon";
import '../style/Homepage.css';

function Homepage()
{
    return (
        <div className="Home" >
            <div id= "Icons">
                <div style={{float:"right", paddingRight:"2%"}}>
                    <Icon link = "https://www.linkedin.com/in/bart%C5%82omiej-bana%C5%9B-a43361206/" icon = "fab fa-linkedin" name = "LinkedIn" type="Homepage" />
                    <Icon link = "https://github.com/Bartasus1" icon = "fab fa-github" name = "GitHub" type="Homepage"/>
                    <Icon link = "https://www.facebook.com/people/Bart%C5%82omiej-Bana%C5%9B/100004063323294/" icon="fab fa-facebook" name = "Facebook" type="Homepage"/>
                    <Icon link = "https://steamcommunity.com/profiles/76561198244377476/" icon = "fab fa-steam" name = "Steam" type="Homepage"/>
                </div>

            </div>
            <h1 id="Name">
                Bartłomiej Banaś
            </h1>
        </div>
    )
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