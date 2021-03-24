import React from 'react';

const WeeklyForecast = ({weekly, weather}) => {

    // const dateBuilder = (d) => {
    //     let months = ["January", "February", "March", "April", "May", "June", "July", 
    //     "August", "September", "October", "November", "December"];
    //     let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", 
    //     "Saturday"];
    
    //     let day = days[d.getDay()];
    //     let date = d.getDate();
    //     let month = months[d.getMonth()];
    //     let year = d.getFullYear();
    
    //     return `${day} ${date} ${month} ${year}`
    
    //   }

    return (
       
         <div className="weekly-forecast">
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
          </div>
          {weekly.daily.map((day) => (
              <div className="weather-box">
              <div className="temp">
                {Math.round(day.temp.day)} °F
              </div>
              <div className="weather">{day.weather[0].main}</div>
            </div>
          )
        )}
          
        </div>
       
    )
};


export default WeeklyForecast;