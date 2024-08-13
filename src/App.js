import React, { useState } from 'react';
import SearchBar from './components/searchBar';
import Filters from './components/filters';
import ArticleList from './components/articleList';
import { fetchNewsAPIArticles, fetchGuardianArticles, fetchNewsDatarticles } from './services/newsService';
import Header from './components/topBar/Header';


const App = () => {
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false)
  const onSearchChange = (query) => {
    const allFields = structuredClone(filters);
    allFields['query'] = query;
    setFilters(allFields);
    handleSearch();
  }

  const handleSearch = async () => {
    let allArticles = [];
    setLoading(true);
    try {
      if (filters.sources === 'newsapi') {
        const newsApiArticles = await fetchNewsAPIArticles(filters.query, filters.category, filters.date);
        allArticles = allArticles.concat(newsApiArticles?.data?.articles);
      }
    } catch (error) {
      setLoading(false);
      console.error('Failed to fetch articles from NewsAPI. Please try again later.', error);
    }

    try {
      if (filters.sources === 'guardian') {
        const guardianArticles = await fetchGuardianArticles(filters.query, filters.category, filters.date);
        allArticles = allArticles.concat(guardianArticles?.data?.response?.results);
      }
    } catch (error) {
      setLoading(false);
      console.error('Failed to fetch articles from The Guardian. Please try again later.', error);
    }

    try {
      if (filters.sources === 'newsdata') {
        const nytArticles = await fetchNewsDatarticles(filters.query, filters.category, filters.date);
        allArticles = allArticles.concat(nytArticles?.data?.results);
      }
    } catch (error) {
      setLoading(false);
      console.error('Failed to fetch articles from NewsData. Please try again later.', error);
    }
    setLoading(false);
    setArticles(allArticles);

  }
  const handleFilterChange = (value, type) => {
    const allFields = structuredClone(filters);
    allFields[type] = value;
    setFilters(allFields);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        onFilterChange={handleFilterChange}
        onApplyFilters={handleSearch}
        onSearch={onSearchChange}
        filters={filters}
      />
      <ArticleList
        loading={loading}
        articles={articles}
      />
    </div>
  );
};

export default App;
