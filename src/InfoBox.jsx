import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './InfoBox.css';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SunnyIcon from '@mui/icons-material/Sunny';
import GrainIcon from '@mui/icons-material/Grain';

export default function Infobox({Info}) {
    const INITIAL_URL = "https://images.unsplash.com/photo-1690743300330-d190ad8f97dc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D";
    const HAZY_URL = "https://images.unsplash.com/photo-1616951849649-74dd2dd7e662?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D";
    const HOT_URL = "https://images.unsplash.com/photo-1525490829609-d166ddb58678?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D";
    const COLD_URL = "https://plus.unsplash.com/premium_photo-1674909054854-c827fb53f069?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D";
    const RAIN_URL = "https://images.unsplash.com/photo-1620385019253-b051a26048ce?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D";
    return (
        <div className="InfoBox">
            <br></br>
            <div className="cardContainer" >
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={
                            Info.temp == 100
                            ? INITIAL_URL
                            :Info.temp < 0
                            ? COLD_URL
                            : Info.humidity > 80 
                            ? RAIN_URL
                            : Info.weather.toLowerCase().includes("haze") || Info.weather.toLowerCase().includes("mist") || Info.weather.toLowerCase().includes("fog")
                            ? HAZY_URL
                            : Info.temp > 18
                            ? HOT_URL
                            : COLD_URL 
                        }
                        title="weather"
                    />
                    <CardContent>
                        <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="div" 
                        sx={
                            {display:'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            textTransform: 'capitalize',
                            fontWeight: 'bold',
                            letterSpacing: '0.5px'}
                            }>
                            {Info.city }{
                            Info.temp < 0
                            ? <AcUnitIcon/>
                            : Info.humidity > 80 
                            ? <ThunderstormIcon/>
                            : Info.weather.toLowerCase().includes("haze") || Info.weather.toLowerCase().includes("mist") || Info.weather.toLowerCase().includes("fog")
                            ? <GrainIcon/>
                            : Info.temp > 18
                            ? <SunnyIcon/>
                            : <AcUnitIcon/>
                        }
                        </Typography>
                        <Typography variant="body2" component="div" sx={{ color: 'text.secondary' }}>
                            <p>Temperature : {Info.temp}&deg;C</p>
                            <p>Humidity : {Info.humidity}</p>
                            <p>Min Temp : {Info.tempMin}&deg;C</p>
                            <p>Max Temp : {Info.tempMax}&deg;C</p>
                            <p style={{ textTransform: 'capitalize' }}>
                            Weather: <b>{Info.weather}</b> & feels like <b>{Info.feelsLike}°C</b>
                            </p>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}