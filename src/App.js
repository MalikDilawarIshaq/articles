import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import ArticleList from './components/ArticleList';
import { fetchNewsAPIArticles, fetchGuardianArticles, fetchNewsDatarticles } from './services/newsService';


const App = () => {
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({});
  const onSearchChange = (query) => {
    const allFields = structuredClone(filters);
    allFields['query'] = query;
    setFilters(allFields);
    handleSearch();
  }

  const handleSearch = async () => {
    let allArticles = [];
    try {
      if (!filters.source || filters.source === 'newsapi') {
        const newsApiArticles = await fetchNewsAPIArticles(filters.query, filters.category, filters.date);
        allArticles = allArticles.concat(newsApiArticles.data.articles);
      }
      if (!filters.source || filters.source === 'guardian') {
        const guardianArticles = await fetchGuardianArticles(filters.query, filters.category, filters.date);
        allArticles = allArticles.concat(guardianArticles.data.response.results);
      }
      if (!filters.source || filters.source === 'newsdata') {
        const nytArticles = await fetchNewsDatarticles(filters.query, filters.category, filters.date);
        allArticles = allArticles.concat(nytArticles.data.response.docs);
      }
      setArticles(allArticles);
    } catch (error) {
      console.error('Failed to fetch articles. Please try again later.', error);
    }
  }
  const handleFilterChange = (value, type) => {
    const allFields = structuredClone(filters);
    allFields[type] = value;
    setFilters(allFields);
  };
  console.log(filters)
  return (
    <div className="min-h-screen bg-gray-100">
      <SearchBar 
        onSearch={onSearchChange} 
      />
      <Filters 
        onFilterChange={handleFilterChange} 
        onApplyFilters={handleSearch} 
        filters={filters}
      />
      <ArticleList 
        articles={articles} 
      />
    </div>
  );
};

export default App;
