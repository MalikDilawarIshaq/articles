import React, { useEffect, useState } from 'react';
import ArticleList from './components/articleList';
import { fetchNewsAPIArticles, fetchGuardianArticles, fetchNewsDataArticles } from './services/newsService';
import Header from './components/topBar/Header';
import ShowMessage from './components/helper/showMessage';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({ sources: "", category: "", date: "", query: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ status: false, type: "", message: "" });

  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      const parsedPreferences = JSON.parse(savedPreferences);
      setFilters((prevState) => ({
        ...prevState,
        sources: parsedPreferences.sources || prevState.sources,
        category: parsedPreferences.categories || prevState.category,
      }));
    }
  }, []);


  const onSearchChange = (search) => {
    setFilters((prevState) => ({
      ...prevState,
      query: search
    }));
  };

  const handleSearch = async () => {
    if (!filters.sources) {
      setMessage({ status: true, type: "error", message: "Please select a source of data from dropdown" });
      return;
    } else {
      setMessage({ status: false, type: "", message: "" });
    }

    setLoading(true);
    let allArticles = [];
    const sourcesMap = {
      newsapi: fetchNewsAPIArticles,
      guardian: fetchGuardianArticles,
      newsdata: fetchNewsDataArticles,
    };

    const handleError = (error) => {
      const errorMessage =
        error?.response?.data?.results?.message || // Check for message in results
        error?.response?.data?.message ||          // Check for message in data
        error?.message ||                          // Fallback to the generic error message
        "An unexpected error occurred";

      setMessage({ status: true, type: "error", message: errorMessage });
      console.error(errorMessage, error);
      setLoading(false);
    };

    try {
      const fetchArticles = sourcesMap[filters.sources];
      if (fetchArticles) {
        const response = await fetchArticles(filters.query, filters.category, filters.date);
        const articles = response?.data?.articles || response?.data?.response?.results || response?.data?.results;
        allArticles = allArticles.concat(articles);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }

    setArticles(allArticles);
  };

  const handleFilterChange = (value, type) => {
    setFilters((prevState) => ({
      ...prevState,
      [type]: value
    }));
  };

  const closeMessagePopup = () => {
    setMessage({ status: false, type: "", message: "" });
  };

  const addPreferences = () => {
    const { sources, category } = filters;
    if (!sources || !category) {
      setMessage({ status: true, type: "error", message: "Sources and Categories are required for preferences" });
      return;
    }

    localStorage.setItem('userPreferences', JSON.stringify({ sources, categories: category }));
    setMessage({ status: true, type: "success", message: "Preferences saved successfully!" });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {message.status && (
        <div className='absolute top-10 left-4 z-50'>
          <ShowMessage message={message} close={closeMessagePopup} />
        </div>
      )}
      <Header
        onFilterChange={handleFilterChange}
        addPreferences={addPreferences}
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
