import { useEffect, useRef, useState } from 'react'
import './App.css'
import Home from './components/Home'
import NavBar from './components/NavBar'
import { countryApiCaller, getCountriesByName, getCountriesByRegion } from './util/countryApiCaller'
import { Route, Routes } from 'react-router-dom'
import CountryDetailPage from './components/CountryDetailPage'

function App() {

  const [countryData, setCountryData] = useState([])
  const [dataLimit, setDataLimit] = useState<number>(20)
  const [slicedCountryData, setSlicedCountryData] = useState([])
  const [endOfData, setEndOfData] = useState<boolean>(false)
  const [filteredData, setFilteredData] = useState([])
  const [filtersApplied, setFiltersApplied] = useState({ search: { value: '', applied: false }, dropdown: { value: '', applied: false } })

  // reference to hold the debounce timeoutId
  const debounceTimeout = useRef<number | null>(null);

  useEffect(() => {
    // made an api caller an called api with fields/filters for faster response
    countryApiCaller('https://restcountries.com/v3.1/all', {
      fields: ["name", "flags", "population", "capital", "region"]
    })
      .then(res => {
        setCountryData(res)
        setSlicedCountryData(res.slice(slicedCountryData.length, dataLimit))
      })
      .catch(error => console.log(error))

    if (filteredData && filteredData.length > 0) {
      document.removeEventListener('scroll', handleScroll)
    }

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const result = countryData.slice(slicedCountryData.length, dataLimit)
    if (!result.length) {
      setEndOfData(true)
    } else {
      setSlicedCountryData(prev => [...prev, ...result])
    }
  }, [dataLimit])

  useEffect(() => {
    if (endOfData) {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [endOfData])

  // useEffect(() => {
  //   const { search, dropdown } = filtersApplied

  //   if (filteredData && filteredData.length > 0) {
  //     document.removeEventListener('scroll', handleScroll)
  //   }

  //   console.log(search, dropdown)

  //   if (!search.applied && dropdown.applied) {
  //     console.log("yaha par chala ye")
  //     setFilteredData([], () => {
  //       handleFilterSearch(dropdown.value);
  //     });
  //   } else if (search.applied && !dropdown.applied) {
  //     setFilteredData([])
  //     handleSearchValue(search.value)
  //   } else if (!search.applied && !dropdown.applied) {
  //     setFilteredData([])
  //   }

  // }, [filtersApplied])
  useEffect(() => {
    const {search, dropdown} = filtersApplied
    if(!search.applied && dropdown.applied){
      handleFilterSearch(dropdown.value)
    } else if (search.applied && !dropdown.applied){
      handleSearchValue(search.value)
    }
  }, [filtersApplied]);

  const handleScroll = () => {
    if (endOfData) return;
    if (debounceTimeout.current) {

      // clear timeout to prevent multiple calls on fast scrolling
      clearTimeout(debounceTimeout.current);
    }

    // settimeout ensurees that pageNum state changes or api gets called after a specific delay after last scroll, this will prevent mulitple scroll event
    debounceTimeout.current = setTimeout(() => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        setDataLimit(prevDataLimit => prevDataLimit + 10);
      }
      debounceTimeout.current = null;
    }, 600);
  };

  const handleSearchValue = async (value: string) => {
    const { search } = filtersApplied
    if (!value) {
      setFiltersApplied(prev => ({ ...prev, search: { applied: false, value } }))
      setFilteredData([])
      return;
    }
    if (value) {
      if (!search.applied) {
        setFiltersApplied(prev => ({ ...prev, search: { applied: true, value } }))
      }
      if (!filteredData.length) {
        const result = await getCountriesByName('https://restcountries.com/v3.1', value)
        if (result) {
          setFilteredData(result)
        }
      } else {
        const result = filteredData.filter((item: { name: { common: string } }) => {
          const itemName = item.name.common.toLowerCase()
          const searchValue = value.toLowerCase()
          return itemName.includes(searchValue)
        })
        if (result) {
          setFilteredData(result)
        }
      }
    }
  }

  const handleFilterSearch = async (value: string) => {
    const { dropdown } = filtersApplied
    if (!value) {
      setFiltersApplied(prev => ({ ...prev, dropdown: { applied: false, value } }))
      setFilteredData([])
      return;
    }
    if (value) {
      if (!dropdown.applied) {
        setFiltersApplied(prev => ({ ...prev, dropdown: { applied: true, value } }))
      }
      if (!filteredData.length) {
        const result = await getCountriesByRegion('https://restcountries.com/v3.1', value)
        if (result) {
          setFilteredData(result)
        }
      } else {
        const result = filteredData.filter((item: { region: string }) => {
          const region = item.region.toLowerCase()
          const searchValue = value.toLowerCase()
          return region === searchValue
        })
        if (result) {
          setFilteredData(result)
        }
      }
    }

  }

  return (
    <div className="dark:bg-dark-main-color overflow-y-auto">
      <NavBar />
      <Routes>
        <Route path="country/:countryName" element={<CountryDetailPage />} />
        <Route path="/" element={<Home
          data={slicedCountryData}
          handleSearchValue={handleSearchValue}
          handleFilterSearch={handleFilterSearch}
          filteredData={filteredData}
        />} />
      </Routes>
    </div>
  )
}

export default App
