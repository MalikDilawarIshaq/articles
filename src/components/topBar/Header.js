import React, { useState } from 'react'
import Filters from '../filters'
import SearchBar from '../searchBar';
import _ from 'lodash';

const Header = (props) => {
  const { onFilterChange, onApplyFilters, filters, onSearch } = props;
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <header className='flex border-b py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50'>
      <div className='flex justify-between w-full items-center flex-col lg:flex-row'>
        <span>React App</span>

        <div className='flex justify-end w-full flex-col lg:flex-row lg:w-[90%]'>
          <div id="collapseMenu"
            className='w-1/2 max-lg:hidden lg:!block max-lg:w-full max-lg:fixed max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50'>
            <div
              className='w-[500px] max-w-[500px] lg:flex lg:ml-14 lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
              <Filters
                onFilterChange={onFilterChange}
                onApplyFilters={onApplyFilters}
                filters={filters}
                direction="row"
              />
            </div>
          </div>

          <button onClick={() => setShowDropDown(!showDropDown)} id="toggleOpen" className='lg:hidden ml-auto w-full flex justify-end'>
            <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"></path>
            </svg>
          </button>

          {showDropDown && <div className='absolute top-16 w-full bg-slate-200 left-0 mt-2 py-4'>
            <Filters
              onFilterChange={onFilterChange}
              onApplyFilters={onApplyFilters}
              filters={filters}
              direction="col"
            />
          </div>}

          <SearchBar
            onSearch={onSearch}
          />
        </div>
      </div>
    </header>
  )
}

const areEqual = (prevProps, nextProps) => {
  return _.isEqual(prevProps.filters, nextProps.filters);
};

export default React.memo(Header, areEqual);
