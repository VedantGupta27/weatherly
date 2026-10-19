import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({updateInfo}) {
    let [city, setCity] = useState("");
    let [err, setErr] = useState(false);

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    let getWeatherInfo = async() => {
        try{
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let jsonResponse = await response.json();
        let Result = {
            city : city,
            temp : jsonResponse.main.temp,
            tempMin : jsonResponse.main.temp_min,
            tempMax : jsonResponse.main.temp_max,
            humidity : jsonResponse.main.humidity,
            feelsLike : jsonResponse.main.feels_like,
            weather : jsonResponse.weather[0].description,
        }
        console.log(Result);
        return Result;
        }
        catch(err){
            throw(err);
        }
        
    }
    let handleChange = (evt) => {
        setCity(evt.target.value);
    };
    let handleSubmit = async(evt) => {
        try{
            evt.preventDefault();
            setErr(false);
            console.log(city);
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            setCity("");
        }catch(err){
            setErr(true)
        }

    };
    return (
        <div className='SearchBox'>
            <h3 style={{color : '#325dd2'}}>WeatherLy</h3>
            <h3>Discover Today's Weather</h3>
            <form onSubmit={handleSubmit}>
                <TextField 
                id="city" 
                label="City Name" 
                variant="outlined" 
                required 
                value={city} 
                onChange={handleChange}
                sx={{ width: { xs: '90%', sm: 300 } }}
                />
                <br></br>
                <br></br>
                <Button variant="contained" type='submit' >Search</Button>
                {err && <p style={{color:"red"}}>No such place exists!</p>}
            </form>
        </div>)
}