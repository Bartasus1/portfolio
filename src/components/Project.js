import Icon from "./Icon";
import "../style/Project.css";

function Project(props)
{
    const Json = props.json;
    const Link = Json.links.map( Link => <Icon link={Link.link} icon={Link.icon} name={Link.name} type="ProjectIcon" />)

    return (
        <div className="Project">

            <div id="ProjectTitle">
                <p className="SectionName">
                    {Json.title}
                </p>
                <p className="SectionInfo" id="TimePeriod">
                    {Json.time_period}
                    <p style={{color:"#CF570C"}}>
                        {Json.engine}
                    </p>
                </p>
            </div>

            <div className="SectionName">
                Rola w projekcie
            </div>
            <div className="SectionName">
                Linki zewnętrzne
            </div>

            <div>
                <p className="SectionInfo" >
                    {Json.role.job} <br/>
                    {Json.role.where}
                </p>
            </div>
            <div style={{display:"flex"}}>
                <div id="ProjectIcons">
                    {Link}
                </div>
            </div>

            <div style={{gridColumn : "1/4", gridRow:"3/4"}}>
                <div>
                    <img src={props.image} id="Image" alt="" />
                </div>

            </div>

            <div id="Description" style={{gridColumn : "1/4"}}>
                {Json.description}
            </div>

        </div>
    )
}

export default Project;


/*Json.links.map( (icon) => {
    return (<Icon key = {icon.name} link = {icon.link} icon = {icon.icon} name = {icon.name} type="ProjectIcon"/>)
}

*/