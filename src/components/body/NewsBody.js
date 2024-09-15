import React from 'react';
import './NewsBody.css'; // Ensure this CSS file exists

const NewsBody = () => {
  // Static news data
  const news = [
    { title: 'News Title 1', description: 'Description for news item 1.' },
    { title: 'News Title 2', description: 'Description for news item 2.' },
    { title: 'News Title 3', description: 'Description for news item 3.' },
  ];

  return (
    <div className="news-body">
      <h1>Top News</h1>
      {news.length > 0 ? (
        news.map((item, index) => (
          <div key={index} className="news-item">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))
      ) : (
        <p>No news available.</p>
      )}
    </div>
  );
};

export default NewsBody;
