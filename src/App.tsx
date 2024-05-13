import { useEffect, useState } from 'react'
import './App.css'
import Home from './components/Home'
import NavBar from './components/NavBar'
import { countryApiCaller } from './util/countryApiCaller'

function App() {

  const [countryData, setCountryData] = useState([])
  const [dataLimit, setDataLimit] = useState(20)

  useEffect(() => {
    // made an api caller an called api with fields/filters for faster response
    countryApiCaller('https://restcountries.com/v3.1/all', {
      fields: ["name", "flags", "population", "capital", "region"],
      limit: dataLimit
    })
      .then(res => setCountryData(res))
      .catch(error => console.log(error))
  }, [])

  return (
    <>
      <NavBar />
      <Home data={countryData} />
    </>
  )
}

export default App
