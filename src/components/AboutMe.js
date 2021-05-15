import "../style/AboutMe.css"
import fire from "../photos/Campfire.jpg"

function AboutMe()
{
    return (
        <div id="AboutMe">
            <img src={fire}  id="Fire" alt="Fire"></img>
            <div id="Text">
                <p className= "Introduction" style={{fontSize: "1.5em"}}>
                    Witaj wędrowcze!
                </p>
                <p className= "Introduction" style={{fontSize: "1.3em"}}>
                    Usiądź i rozgość się przy ognisku. <br />
                    Pozwól, że się przedstawię.
                </p>
                <p>
                    Nazywam się Bartek i moją pasją są gry komputerowe,<br />
                    zwłaszcza proces ich tworzenia.
                </p>
                <p>
                    Jako programista najbardziej interesuję się rolą <br/>
                    gameplay programmer / designer.
                </p>
                <p>
                    Moim ulubionym językiem programowania jest C++. <br />
                    Bardzo spodobał mi się również silnik Unreal Engine, <br />
                    w którym obecnie doskonalę swoje umiejętności.
                </p>
                <p>
                    Pierwszą styczność z Unreal Engine miałem w połowie 2020 roku. <br/>
                    W ciągu 6-ciu miesięcy intensywnej nauki i pracy udało mi się stworzyć <br/>
                    grywalny protoptyp mojej pierwszej gry - wieloosobowej karcianki 3D.
                </p>
                <p style={{float : "right", marginRight:"15%", fontSize:"0.9em"}}>
                    Moje zainteresowania to:
                    <ul>
                        <li>gry komputerowe</li>
                        <li>programowanie</li>
                        <li>ksiązki i filmy</li>
                        <li>łucznictwo</li>
                        <li>survival</li>
                    </ul>
                </p>
            </div>
        </div>
    )
}

export default AboutMe;