import { useState } from "react";
import SearchBox from "./SearchBox";
import Infobox from "./InfoBox";

export default function WeatherApp() {
    const [WeatherInfo, setWeatherInfo] = useState({
        city: "City name",
        feelsLike: 0,
        temp: 100,
        tempMin: 0,
        tempMax: 0,
        humidity: 0,
        weather: "Weather",
    });

    let updateInfo = (result) => {
        setWeatherInfo(result);
    }
    return (
    <div>
        <SearchBox updateInfo={updateInfo}/>
        <Infobox Info ={WeatherInfo}/>
        <p style={{ color: "#6b6375", fontSize: "14px", marginTop: "20px" }}>
        Live API data may not always be fully accurate. Weather Dashboard by <b>~Vedant</b>
        </p>
    </div>
    );
}