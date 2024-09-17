import React from 'react';
import './NewsBody.css';

const NewsBody = ({ news, loadMore, hasMore }) => {
  return (
    <div className="news-body">
      <h1>Top News</h1>
      {news.length > 0 ? (
        <>
          {news.map((item, index) => (
            <div key={index} className="news-item">
              <h2>{item.title}</h2>
              <p>{item.snippet}</p>
              <p><strong>Publisher:</strong> {item.publisher}</p>
              <p><strong>Date:</strong> {item.dateTime}</p>
              <a href={item.newsUrl} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          ))}
          {hasMore && (
            <button className="load-more" onClick={loadMore}>
              Load More
            </button>
          )}
        </>
      ) : (
        <p>Set your location</p>
      )}
    </div>
  );
};

export default NewsBody;
