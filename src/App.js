import React, { useState, useEffect } from 'react';
import Header from './components/header/Header'; // Adjust the import path as needed
import NewsBody from './components/body/NewsBody'; // Adjust the import path as needed
import axios from 'axios';

const App = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = async (city, pageNum) => {
    try {
      const formattedCity = city.replace(/\s+/g, '%20'); // Replace spaces with %20
      const response = await axios.get(`http://ec2-51-20-129-226.eu-north-1.compute.amazonaws.com:8080/api/usa/news?keyword=${formattedCity}&page=${pageNum}`);
      
      if (response.data.length > 0) {
        setNews(prevNews => [...prevNews, ...response.data]);
        setPage(prevPage => prevPage + 1);
      } else {
        setHasMore(false); // No more news available
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setNews([]); // Clear current news
    setPage(1); // Reset page number
    setHasMore(true); // Reset hasMore flag
    fetchNews(city, 1); // Fetch news for the selected city
  };

  const loadMore = () => {
    if (hasMore) {
      fetchNews(selectedCity, page);
    }
  };

  useEffect(() => {
    if (selectedCity) {
      fetchNews(selectedCity, page);
    }
  }, [selectedCity]);

  return (
    <div>
      <Header onCitySelect={handleCitySelect} />
      <NewsBody news={news} loadMore={loadMore} hasMore={hasMore} />
    </div>
  );
};

export default App;
