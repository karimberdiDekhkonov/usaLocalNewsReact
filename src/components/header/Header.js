import React, { useState } from 'react';
import axios from 'axios'; // Make sure axios is installed
import './Header.css'; // Ensure this CSS file exists for styling
import { FaMapMarkerAlt } from 'react-icons/fa'; // Import location icon from react-icons

const Header = () => {
  // State for user input, filtered cities, and loading status
  const [input, setInput] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Capitalize the first letter of each word in a string
  const capitalizeWords = (str) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Replace spaces with %20 and capitalize each word
  const formatQuery = (str) => {
    return capitalizeWords(str.trim()).replace(/\s+/g, '%20');
  };

  // Fetch cities from the backend
  const fetchCities = async (query) => {
    const formattedQuery = formatQuery(query); // Format the query

    if (!formattedQuery) return; // No query, no fetch

    setLoading(true);

    try {
      const response = await axios.get(`http://localhost:8080/api/usa/cities/${formattedQuery}`);
      setFilteredCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setFilteredCities([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInput(value);

    // Fetch cities if the input length is sufficient
    if (value.length > 2) {
      fetchCities(value);
    } else {
      setFilteredCities([]);
    }
  };

  // Handle city selection
  const handleCitySelect = (city) => {
    setInput(city);
    setFilteredCities([]); // Clear suggestions after selection
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
