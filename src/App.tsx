import { useEffect, useState } from 'react'
import './App.css'
import Home from './components/Home'
import NavBar from './components/NavBar'
import { countryApiCaller } from './util/countryApiCaller'

function App() {

  const [countryData, setCountryData] = useState([])
  const [dataLimit, setDataLimit] = useState(20)
  const [slicedCountryData, setSlicedCountryData] = useState([])

  useEffect(() => {
    // made an api caller an called api with fields/filters for faster response
    countryApiCaller('https://restcountries.com/v3.1/all', {
      fields: ["name", "flags", "population", "capital", "region"]
    })
      .then(res => setCountryData(res))
      .catch(error => console.log(error))



      function handleScrollEvent(){
          console.log("Scroll")
      } 
      document.addEventListener('scroll', handleScrollEvent)
      return () => {
        document.removeEventListener('scroll', handleScrollEvent)
      }
  }, [])

  

  useEffect(() => {
    if(!countryData.length){
      return;
    } else {
      setSlicedCountryData(countryData.slice(0, dataLimit))
    }
  }, [countryData])


  // make another state -> slicedCountryData -> countryData.slice(0,21) -> first 20 items
  // pass sliced data to <Home />
  // add event on scroll to slice and pass next 20 items -> (0, 41 {passState + 20})
  // add debounce to handle scroll 
  // remove scroll event once no more data is left to be sliced



  return (
    <>
      <NavBar />
      <Home data={slicedCountryData} />
    </>
  )
}

export default App
