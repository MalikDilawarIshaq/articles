import React from 'react';

const Filters = (props) => {
  const { onFilterChange, onApplyFilters, filters } = props;
  const guardian = [{name: "Technology", value: "technology"}, {name: "Business", value: "business"}, {name: "Sports", value: "sports"}];
  const newsApi = [{name: "Google news", value: "google-news"}, {name: "BBC News", value: "bbc-news"}]
  const newsData = [{ name: "English", value: "en" }, { name: "Spanish", value: "es" }, { name: "French", value: "fr" }]
  console.log(filters)
  const categoriesToShow = filters.source === "guardian" ? guardian : filters.source === "newsapi" ? newsApi : newsData;
  return (
    <div className="p-4">
      <h3 className="font-bold">Filters</h3>
      <select onChange={(e) => onFilterChange(e.target.value, 'source')} className="border rounded p-2 w-full mt-2">
        <option value="">All Sources</option>
        <option value="newsapi">NewsAPI</option>
        <option value="guardian">The Guardian</option>
        <option value="newsdata">News Data io</option>
      </select>
      <select onChange={(e) => onFilterChange(e.target.value, 'category')} className="border rounded p-2 w-full mt-2">
        <option value="">All Categories</option>
        {
          categoriesToShow?.map((category)=>{
            return (
              <option value={category.value}>{category.name}</option>
            )
          })
        }
      </select>
      <input
      disabled={filters.source === "newsdata"}
        type="date"
        onChange={(e) => onFilterChange(e.target.value, 'date')}
        className="border rounded p-2 w-full mt-2"
      />
       <button onClick={()=>onApplyFilters("")} className="mt-2 bg-blue-500 text-white p-2 rounded">
        Apply Filter
      </button>
    </div>
  );
};

export default Filters;
