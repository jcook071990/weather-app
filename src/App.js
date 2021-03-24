import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import WeeklyForecast from './components/WeeklyForecast';

const api = {
  key: "38c347e19ae710509cd809ea1dcc6330",
  base: "http://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [weekly, setWeekly] = useState({});
  // const [latitude, setLatitude] = useState(null);
  // const [longitude, setLongitude] = useState(null);

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        // setLatitude(result.coord.lat);
        // setLongitude(result.coord.lon);
        console.log("daily", result);
        weeklySearch(result)
        });
    }
  }

  const weeklySearch = (result) => {
    const latitude = result.coord.lat;
    const longitude = result.coord.lon;
    console.log("lat, long", latitude, longitude);

    if (weather !== {} ) {
      fetch(`${api.base}onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&units=imperial&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeekly(result);
        console.log("weekly result", result)
      })
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", 
    "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", 
    "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`

  }

  return (
    <>
    <Router>
      <Route exact path="/">

    <div className={(typeof weather.main != "undefined") ? 
    ((weather.main.temp < 30) 
    ? 'app cold' 
    : 'app') 
    : 'app'}>
     <main>
       <div className="search-box">
         <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)} °F
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          <Link to="/weekly">
          <button>Weekly Forecast</button>
          </Link> 
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
    </Route>
    <Route path="/weekly">
      <WeeklyForecast weekly={weekly} weather={weather}/>
    </Route>
    </Router>
    </>
  );
}

export default App;