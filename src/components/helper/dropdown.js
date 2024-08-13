import React from 'react'
import _ from 'lodash';

const Dropdown = (props) => {
  const {title, name, options, onFilterChange, direction} = props;

  return (
    <div className="relative inline-block text-left">
      <select onChange={(e) => onFilterChange(e.target.value, name)} className={`outline outline-transparent focus-within:outline-[#007bff] focus-within:bg-transparent border text-sm rounded px-2 py-3 h-[45px] mt-2 ${direction === "col" ? "w-full" : " w-[128px]"}`}>
        <option value="">{title}</option>
        {
          options?.map((category, id)=>{
            return (
              <option key={category.name + id} value={category.value}>{category.name}</option>
            )
          })
        }
      </select>
    </div>
  )
}

const areEqual = (prevProps, nextProps) => {
  return (_.isEqual(prevProps.options, nextProps.options) && 
   prevProps.direction === nextProps.direction)
};

export default React.memo(Dropdown, areEqual);