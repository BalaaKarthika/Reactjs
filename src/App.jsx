import React, { useState, useEffect } from 'react';
import './App.css'

const apiKey = '05da668771b1d34d093bdf3a60b40ed3';

let countries = {
  "India": ["Chennai", "Mumbai", "Delhi", "Bangalore"],
  "USA": ["New York", "Los Angeles", "Chicago", "Miami"],
  "Canada": ["Toronto", "Vancouver", "Montreal", "Calgary"],
  "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth"]
};

const WeatherDashboard = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);
  const [weather, setWeather] = useState(null);
  const [isWeatherButtonDisabled, setWeatherButtonDisabled] = useState(true);

  useEffect(() => {
    if (selectedCountry) {
      setCities(countries[selectedCountry]);
    } else {
      setCities([]);
    }
  }, [selectedCountry]);

  const fetchWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data) {
        setWeather({
          temperature: data.main.temp,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed
        });
      } else {
        setWeather(null);  
      }
    } catch (error) {
      console.error('Error:', error);
      setWeather(null);  
    }
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedCity('');
  };

  const handleCityChange = (e) => {
    let city = e.target.value;
    setSelectedCity(city);
    setWeatherButtonDisabled(!city);
  };

  const handleGetWeather = () => {
    fetchWeather(selectedCity);
  };

  return (
    <div className="container">
      <div className="left-column">
        <h2>Weather Dashboard</h2>
        <form id="weather-form">
          <div className="two">
            <label htmlFor="country">SelectCountry:</label>
            <select id="country" name="country" onChange={handleCountryChange} value={selectedCountry}>
              <option value="">--Select--</option>
              {Object.keys(countries).map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="two">
            <label htmlFor="city">SelectCity:</label>
            <select id="city" name="city" onChange={handleCityChange} value={selectedCity} disabled={!selectedCountry}>
              <option value="">--Select--</option>
              {cities.map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <button type="button" id="get-weather" onClick={handleGetWeather} disabled={isWeatherButtonDisabled}>
            Get Weather
          </button>
        </form>
      </div>
      <div className="right-column">
        <h2>Weather Details</h2>
        <table id="weather-table">
          <thead>
            <tr>
              <th>Temperature (°C)</th>
              <th>Humidity (%)</th>
              <th>Wind Speed (km/h)</th>
            </tr>
          </thead>
          <tbody>
            {weather ? (
              <tr>
                <td>{weather.temperature}</td>
                <td>{weather.humidity}</td>
                <td>{weather.windSpeed}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan="3"></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherDashboard;
 