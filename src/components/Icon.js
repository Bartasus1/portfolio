import "../style/Icon.css";


function Icon(props)
{
    const type = "Icon " + props.type;
    return (
        <a href={props.link} className={type}>
            <i className={props.icon}  id={props.name}  />
        </a>
    )
}

export default Icon;