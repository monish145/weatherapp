import { useEffect, useState } from 'react';
import './App.css';
import PropTypes from "prop-types";

const WeatherDetails = ({temp,city,country,lat,log,humidity,wind}) => {
return (
  <>
  <div className="temp">{temp}`C</div>
  <div className="location">{city}</div>
  <div className="country">{country}</div>
  <div className="cord">
    <div>
      <span className="lat">latitude</span>
      <span>{lat}</span>
    </div>
    <div> 
      <span className="log">longitude</span>
      <span>{log}</span>
    </div>
    </div>
    <div className="data-container">
      <div className="element">
        <div className="data">
          <div className="humidity-percent">{humidity}%</div>
          <div className="text">Humidity</div>
        </div>
      </div>
      <div className="element">
        <div className="data">
          <div className="wind-percent">{wind}km/h</div>
          <div className="text">Wind Speed</div>
        </div>
      </div>
    </div>
  </>
);
};

// WeatherDetails.PropTypes = {
//   temp: PropTypes.number.isRequired,
//   city: PropTypes.string.isRequired,
//   country: PropTypes.string.isRequired,
//   humidity: PropTypes.number.isRequired,
//   wind: PropTypes.number.isRequired,
//   lat: PropTypes.number.isRequired,
//   log: PropTypes.number.isRequired,

// }


function App() {
 let api_key = "0869b5791725e93fd78dc6e4ce11a5f9";
 const[text,setText] = useState("london");
 const[temp,setTemp] = useState(0);
 const[city,setCity] = useState("london");
 const[country,setCountry] = useState("GB");
 const[lat,setLat] = useState(0);
 const[lon,setLog] = useState(0);
 const[humidity,setHumidity] = useState(0);
 const[wind,setWind] = useState(0);
 const[error,setError] = useState(null);

 const [cityNotFound,setCityNotFound] = useState(false);
 const [loading,setLoading] = useState(false);

 const search = async () => {
  setLoading(true);

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

  try {
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      if(data.cod === "404") {
        console.error("city not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      setCityNotFound(false);

  }catch(error) {
  console.error("An error occurred:",error.message);
  setError("An error occured while fetching weather data.")
  }finally {
    setLoading(false);
  }
};


  
 

 const handleCity = (e) => {
   setText(e.target.value);
 };

const handleKeyDown = (e) => {
  if(e.key === "Enter"){
  search();
  }
};

useEffect(function () {
  search();
  },[]);
  
 return (
   <>
    <div className="container">
       <div className="input-container">
        <input type="text"
        className="cityInput"
        placeholder="search city"
        onChange={handleCity}
        value={text}
        onKeyDown={handleKeyDown}
        onClick={() => search()}/>
        </div>  
        {/* <WeatherDetails temp={temp} city={city} country={country} lat={lat} log={lon} humidity={humidity} wind={wind}/> */}
          
         {loading && <div className="loading-message">Loading...</div>}
         {error && <div className="error-message">{error}</div>}
         {cityNotFound && <div className="city-not-found">City not found</div>}
         {!loading && !cityNotFound && <WeatherDetails temp={temp} city={city} country={country} lat={lat} log={lon} humidity={humidity} wind={wind}/>}


        <p className="copyright">
          Designed by <span>Monish</span>
        </p>
    </div>
    </>
  );
}

export default App;
 