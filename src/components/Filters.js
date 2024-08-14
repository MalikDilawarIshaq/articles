import React, { useEffect, useState } from 'react';
import Dropdown from './helper/dropdown';
import { guardian, newsApi, newsData, sources } from './helper/filtersData';
import _ from 'lodash';

const Filters = (props) => {
  const { onFilterChange, onApplyFilters, filters, direction, addPreferences } = props;

  const [categoriesToShow, setCategoriesToShow] = useState(guardian);

  useEffect(() => {
    const categories = filters.sources == "guardian" ? guardian : filters.sources == "newsapi" ? newsApi : newsData;
    setCategoriesToShow(categories);
  }, [filters.sources])

  return (
    <div className={`p-1 flex justify-between w-full ${direction === "col" && "flex-col"}`}>
      <Dropdown
        title="Sources"
        name="sources"
        options={sources}
        onFilterChange={onFilterChange}
        direction={direction}
        value={filters.sources}
      />
      <Dropdown
        title="Categories"
        name="category"
        options={categoriesToShow}
        onFilterChange={onFilterChange}
        direction={direction}
        value={filters.category}
      />
      <input
        disabled={filters.source === "newsdata"}
        type="date"
        onChange={(e) => onFilterChange(e.target.value, 'date')}
        className={`border rounded p-2 mt-2 outline outline-transparent focus-within:outline-[#007bff] focus-within:bg-transparent ${direction === "col" ? "w-full" : " w-[128px]"}`}
      />
      <button onClick={onApplyFilters} className={`z-1 cursor-pointer text-xs mt-2 bg-blue-500 text-white rounded ${direction === 'col' ? "py-3" : "px-2"}`}>
        Apply
      </button>
      <button id="addPreferences" onClick={addPreferences} className={`z-1 cursor-pointer text-xs mt-2 bg-blue-500 text-white rounded ${direction === 'col' ? "py-3" : "px-2"}`}>
        Save Preferences
      </button>
    </div>
  );
};

const areEqual = (prevProps, nextProps) => {
  return _.isEqual(prevProps.filters, nextProps.filters);
};

export default React.memo(Filters, areEqual);
