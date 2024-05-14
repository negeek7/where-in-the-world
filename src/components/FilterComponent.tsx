import { useState } from "react";


// we can also use types to define props structure
type FilterProps = {
  handleFilterSearch: Function,
  regions: Array<string>
}

function FilterComponent({handleFilterSearch, regions}: FilterProps) {

  const [isOpen, setIsOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState('')

  const handleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectRegion = (value: string) => {
    setSelectedRegion(value)
    setIsOpen(false)
    handleFilterSearch(value)
  }

  return (
    <div className="relative">
      <button
        id="dropdownDefaultButton"
        onClick={handleDropDown}
        className="shadow-lg bg-black bg-opacity-0 text-light-font-color focus:ring-0 focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:focus:ring-blue-800" type="button">
        {!selectedRegion ? 'Filter by Region' : selectedRegion}
        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      <div
        id="dropdownId"
        className={`${!isOpen && 'hidden'} absolute top-14 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
      >
        <ul className="py-2 text-md text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          {
            regions.map(region => (
              <li onClick={() => handleSelectRegion(region)}>
                <span className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{region}</span>
              </li>
            ))
          }

        </ul>
      </div>
    </div>
  )
}

export default FilterComponent