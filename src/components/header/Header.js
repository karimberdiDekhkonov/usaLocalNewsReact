import React, { useState } from 'react';
import axios from 'axios';
import './Header.css';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Header = ({ onCitySelect }) => {
  const [input, setInput] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const capitalizeWords = (str) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const formatQuery = (str) => {
    return capitalizeWords(str.trim()).replace(/\s+/g, '%20');
  };

  const fetchCities = async (query) => {
    const formattedQuery = formatQuery(query);

    if (!formattedQuery) return;

    setLoading(true);

    try {
      const response = await axios.get(`https://xonqizirobot-production.up.railway.app/api/usa/cities/${formattedQuery}`);
      setFilteredCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setFilteredCities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInput(value);

    if (value.length > 2) {
      fetchCities(value);
    } else {
      setFilteredCities([]);
    }
  };

  const handleCitySelect = (city) => {
    setInput(city);
    setFilteredCities([]);
    onCitySelect(city); // Notify parent about city selection
  };

  return (
    <header className="header">
      <div className="logo">USA Local News</div>
      <div className="location">
        <FaMapMarkerAlt className="location-icon" />
        <label htmlFor="location-input" className="location-label">Set Location:</label>
        <div className="input-container">
          <input
            id="location-input"
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter city..."
          />
          {loading && <div className="loading">Loading...</div>}
          {filteredCities.length > 0 && (
            <ul className="suggestions-list">
              {filteredCities.map((city, index) => (
                <li key={index} onClick={() => handleCitySelect(city)}>
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
