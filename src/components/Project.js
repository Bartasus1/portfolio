import Icon from "./Icon";
import "../style/Project.css";

function Project(props)
{
    const Json = props.json;
    const Links = Json.links.map( Link => <Icon key={Link.name} link={Link.link} icon={Link.icon} name={Link.name} type="ProjectIcon" />)

    return (

        <div className="Project">
            <div id="Title">
                <p className="SectionName">
                    {Json.title}
                </p>
                <p className="SectionInfo" id="TimePeriod">
                    {Json.time_period}
                </p>
                <p id="Engine">
                    {Json.engine}
                </p>
            </div>
            <div className="InfoCellWrapper">
                <div className="SectionName InfoCell">
                    <p>
                        Rola w projekcie
                    </p>
                </div>
                <div className="SectionInfo">
                    <p id="MyRole">
                        {Json.role.job} <br/>
                        {Json.role.where}
                    </p>
                </div>
            </div>

            <div className="InfoCellWrapper">
                <div className="SectionName InfoCell">
                    <p>
                        Linki zewnętrzne
                    </p>
                </div>

                <div className="SectionInfo" id="LinksInfo">
                    <div id="Links">
                        {Links}
                    </div>
                </div>
            </div>

            <div className="LongRow">
                <div id="ImageFrame">
                    <img src={props.image} id="Image" alt="" />
                </div>
            </div>
            <div className="LongRow">
                <p id="Description">
                    {Json.description}
                </p>
            </div>
        </div>
    )
}

export default Project;


/*Json.links.map( (icon) => {
    return (<Icon key = {icon.name} link = {icon.link} icon = {icon.icon} name = {icon.name} type="ProjectIcon"/>)
}
<div className="Info">
                <p className="SectionName">
                    {Json.title}
                </p>
                <p className="SectionInfo">
                    {Json.time_period}
                </p>
                <p style={{color:"#CF570C"}}>
                    {Json.engine}
                </p>
            </div>
            <div className="Info">
                <div className="SectionName">
                    <p>
                        Rola w zespole
                    </p>
                </div>
                <div className="SectionInfo">
                    <p className="SectionInfo">
                        {Json.role.job} <br/>
                        {Json.role.where}
                    </p>
                </div>
            </div>
            <div >
                <div className="SectionName">
                    <p>
                        Linki zewnętrzne
                    </p>
                </div>
                <div className="SectionInfo">
                    {Links}
                </div>
            </div>
            <div className="LongRow" id="ImageFrame">
                <img src={props.image} alt="" id="Image" />
            </div>
            <div className="LongRow" id="Description">
                <p>
                    {Json.description}
                </p>
            </div>
*/