import React, { useEffect, useState } from 'react';
import { fetchArticles, fetchAndStoreArticles } from '../api';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchAndStoreArticles().then(() => {
      fetchArticles().then((response) => {
        setArticles(response.data);
      });
    });
  }, []);

  return (
    <div>
      <h1>Latest News</h1>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
            <p>{article.description}</p>
            <p><strong>Source:</strong> {article.source}</p>
            <p><strong>Published At:</strong> {new Date(article.publishedAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;