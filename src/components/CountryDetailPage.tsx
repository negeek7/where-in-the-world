import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getCountriesByName } from "../util/countryApiCaller";
import styles from '../../styles/countrydetailpage.module.css';
import { ArrowLeft } from "@phosphor-icons/react";

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
        <span className="py-1 px-6 border-2 ml-2 rounded border-none shadow-lg">{item} </span>
      )
    })
  }

  return (
    <div className="p-6 px-6 dark:bg-dark-main-color border-2">
      <button className="border-none text-sm md:text-lg flex text-center items-center gap-4 justify-center shadow-lg outline-none focus:ring-0 hover:ring-0 dark:text-white mb-16">
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>
      <div className="flex flex-row flex-wrap items-center justify-center">
        {
          countryData && 'flags' in countryData &&
          <div className={styles.imagecontainer}>
            <img src={countryData.flags.png} />
          </div>
        }
        <div className="flex gap-4 flex-col dark:text-white border-2 border-red-500">
          {
            countryData && 'name' in countryData &&
            <h2 className="font-bold text-2xl my-8">{countryData.name.official}</h2>
          }
          <div className="flex flex-row flex-wrap gap-10 md:gap-14">
            <div className="flex flex-col gap-2">
              {
                countryData && 'nativeName' in countryData && countryData.nativeName && countryData.nativeName.length > 0 &&
                <p className="text-light-font-color font-semibold dark:text-gray-200">Native Name: <span className="font-extralight">{countryData.nativeName[0].official}</span></p>
              }
              {
                countryData && 'population' in countryData &&
                <p className="text-light-font-color font-semibold dark:text-gray-200">Population: <span className="font-extralight">{countryData.population}</span></p>
              }
              {
                countryData && 'region' in countryData &&
                <p className="text-light-font-color font-semibold dark:text-gray-200">Region: <span className="font-extralight">{countryData.region}</span></p>
              }
              {
                countryData && 'subregion' in countryData &&
                <p className="text-light-font-color font-semibold dark:text-gray-200">Sub Region: <span className="font-extralight">{countryData.subregion}</span></p>
              }
              {
                countryData && 'capital' in countryData &&
                <p className="text-light-font-color font-semibold dark:text-gray-200">Capital: <span className="font-extralight">{countryData.capital[0]}</span></p>
              }
            </div>
            <div className="flex flex-col gap-2">
              {
                countryData && 'currencies' in countryData &&
                <p className="text-light-font-color font-semibold dark:text-gray-200">Currencies: <span className="font-extralight">{getCurrencies(countryData.currencies)}</span></p>
              }
              {
                countryData && 'languages' in countryData &&
                <p className="text-light-font-color font-semibold dark:text-gray-200">Languages: <span className="font-extralight">{getLanguages(countryData.languages)}</span></p>
              }
            </div>
          </div>
          <div className="mt-8 md:mt-0">
            {
              countryData && 'borders' in countryData &&
              <p className="dark:text-gray-200">Border Countries: {getBorderCountries(countryData.borders)}</p>
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default CountryDetailPage