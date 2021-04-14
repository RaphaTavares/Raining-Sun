import { Fragment, useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const kelvin = 273;
  const [iconURL, setIconURL] = useState(false);
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

   const getWeather = (lat, lon) =>{
    let accesskey = process.env.REACT_APP_OPEN_WEATHER_KEY;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${accesskey}`)
    .then(res =>{
      if(!res.ok){ throw Error('response is not okay :\'(');}
      return res.json()
    })
    .then(data =>{
      setWeather(data);
      setIconURL("http://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
    })
    .catch(err =>{console.log("error: " + err.message)});


    /*
    let res = await axios.get(`api.openweathermap.org/data/2.5/weather`,{
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
    */
  }
  
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    });
  }, []);

  if (!location) {
    return (
      <Fragment>
        <div className="board">
        Você precisa habilitar a localização no browser o/
        </div>
      </Fragment>
    )
  } else if (!weather && !iconURL) {
    return (
      <Fragment>
        <div className="board">
        Carregando o clima...
        </div>
      </Fragment>
    )
  } else {
    return (      
      <Fragment>
        <div className="board">
        {console.log(weather)}
        <h3>Clima agora em {weather.name} ({weather.weather[0].description/*['weather'][0]['description']*/})</h3>
        <img src={iconURL} alt="weather image"/>
        <hr/>
        <ul>
          <li>Temperatura atual: {(weather['main']['temp'] - kelvin).toFixed(2)}°</li>
          <li>Temperatura máxima: {(weather['main']['temp_max'] - kelvin).toFixed(2)}°</li>
          <li>Temperatura minima: {(weather['main']['temp_min'] - kelvin).toFixed(2)}°</li>
          <li>Pressão: {weather['main']['pressure']} hpa</li>
          <li>Humidade: {weather['main']['humidity']}%</li>
        </ul>
        </div>
      </Fragment>
    );
  }
}
 
export default Home;