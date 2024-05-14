import { useEffect, useRef, useState } from 'react'
import './App.css'
import Home from './components/Home'
import NavBar from './components/NavBar'
import { countryApiCaller } from './util/countryApiCaller'

function App() {

  const [countryData, setCountryData] = useState([])
  const [dataLimit, setDataLimit] = useState<number>(20)
  const [slicedCountryData, setSlicedCountryData] = useState([])
  const [endOfData, setEndOfData] = useState<boolean>(false)
  const [searchFilteredData, setSearchFilteredData] = useState([])
  const [filtersApplied, setFiltersApplied] = useState<boolean>(false)

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

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const result = countryData.slice(slicedCountryData.length, dataLimit)
    if(!result.length){
      setEndOfData(true)
    } else {
      setSlicedCountryData(result)
    }
  }, [dataLimit])

  useEffect(() => {
    if(endOfData){
      document.removeEventListener('scroll', handleScroll)
    }
  }, [endOfData])

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


  // make another state -> slicedCountryData -> countryData.slice(0,21) -> first 20 items
  // pass sliced data to <Home />
  // add event on scroll to slice and pass next 20 items -> (0, 41 {passState + 20})
  // add debounce to handle scroll 
  // remove scroll event once no more data is left to be sliced

  const handleSearchValue = (value: string) => {
    const result = slicedCountryData.filter((item: {name: {common: string}}) =>{
      const itemName = item.name.common.toLowerCase()
      const searchValue = value.toLowerCase()
      return itemName.includes(searchValue)
    })
    console.log(result, "result")
    if(result.length > 0){
      setSearchFilteredData(result)
    }
  }

  return (
    <>
      <NavBar />
      <Home 
        data={slicedCountryData} 
        handleSearchValue={handleSearchValue}
        searchFilteredData={searchFilteredData}
      />
    </>
  )
}

export default App
