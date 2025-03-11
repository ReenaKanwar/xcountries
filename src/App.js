import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://xcountries-backend.azurewebsites.net/all");
        setCountries(response.data);
      } catch (err) {
        console.error(`Error fetching data: ${err.message}`);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    fetchCountries();
  }, []);
  
  return (
    <div className="App">
      <h1>XCountries</h1>
      <div className="country-grid">
        {error && <p className="error">{error}</p>}
        {countries.map((country) => (
          <div key={country.code} className="country-card">
            <img src={country.flag} alt={`Flag of ${country.name}`} className="flag" />
            <h3>{country.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
