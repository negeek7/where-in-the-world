import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getCountriesByName } from "../util/countryApiCaller";
import styles from '../../styles/countrydetailpage.module.css';

function CountryDetailPage() {


  type ContryData = {
    name: {
      official: string,
      common: string
    },
    flags: {
      png: string,
      alt: string,
    },
    nativeName: Array<{ official: string, common: string }>,
    population: number,
    region: string,
    subregion: string,
    capital: Array<string>,
    currencies: object,
    languages: object,
    borders: Array<string>,

  }


  const [countryData, setCountryData] = useState<ContryData | {}>({})
  const [IsLoading, setIsLoading] = useState(false)

  const { countryName } = useParams();


  console.log(countryName, "RENDERED COUNTRY PAGEs")

  useEffect(() => {
    setIsLoading(true)
    getCountriesByName('https://restcountries.com/v3.1', `${countryName}`)
      .then(res => {
        setCountryData(res[0])
        setIsLoading(true)
      })
      .catch(error => console.log(error))
  }, [])


  console.log(countryData, "countryData")

  const getCurrencies = (obj: object) => {
    return Object.values(obj)[0].name
  }
  const getLanguages = (obj: object) => {
    return Object.values(obj).join(', ')
  }

  const getBorderCountries = (arr: Array<string>) => {
    return arr.map(item => {
      return (
        <span>{item} </span>
      )
    })
  }

  return (
    <div>
      <div className="border-2 border-red-800 p-14 flex flex-row gap-16 items-center">
        {
          countryData && 'flags' in countryData &&
          <div className={styles.imagecontainer}>
            <img src={countryData.flags.png} />
          </div>
        }
        <div>
          {
            countryData && 'name' in countryData &&
            <h2 className="font-bold text-2xl">{countryData.name.official}</h2>
          }
          {
            countryData && 'nativeName' in countryData && countryData.nativeName && countryData.nativeName.length > 0 &&
            <p>Native Name: {countryData.nativeName[0].official}</p>
          }
          {
            countryData && 'population' in countryData &&
            <p>Population: {countryData.population}</p>
          }
          {
            countryData && 'region' in countryData &&
            <p>Region: {countryData.region}</p>
          }
          {
            countryData && 'subregion' in countryData &&
            <p>Sub Region: {countryData.subregion}</p>
          }
          {
            countryData && 'capital' in countryData &&
            <p>Capital: {countryData.capital[0]}</p>
          }
          {
            countryData && 'currencies' in countryData &&
            <p>Currencies: {getCurrencies(countryData.currencies)}</p>
          }
          {
            countryData && 'languages' in countryData &&
            <p>Languages: {getLanguages(countryData.languages)}</p>
          }
        </div>
        {
          countryData && 'borders' in countryData &&
          <p>Border Countries: {getBorderCountries(countryData.borders)}</p>
        }

      </div>
    </div>
  )
}

export default CountryDetailPage