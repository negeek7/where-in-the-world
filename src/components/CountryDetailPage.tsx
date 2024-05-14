import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getCountriesByName } from "../util/countryApiCaller";
import styles from '../../styles/countrydetailpage.module.css';
import { ArrowLeft } from "@phosphor-icons/react";
import { useNavigate } from 'react-router-dom';

function CountryDetailPage() {

  const navigate = useNavigate();

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
  const [IsLoading, setIsLoading] = useState<any>(false)

  const { countryName } = useParams();


  useEffect(() => {
    setIsLoading(true)
    getCountriesByName('https://restcountries.com/v3.1', `${countryName}`)
      .then(res => {
        setCountryData(res[0])
        setIsLoading(false  )
      })
      .catch(error => console.log(error))
  }, [])

  const getCurrencies = (obj: object) => {
    return Object.values(obj)[0].name
  }
  const getLanguages = (obj: object) => {
    return Object.values(obj).join(', ')
  }

  const getBorderCountries = (arr: Array<string>) => {
    return arr.map(item => {
      return (
        <>
        <span className={`py-1.5 px-6 rounded-md shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] dark:shadow-[1.0px_8.0px_8.0px_rgba(0,0,0,0.38)] dark:font-extralight text-xs`}>{item} </span>
        </>
      )
    })
  }

  return (
    
      <div className="px-6 lg:px-12 xl:px-28 p-6 dark:bg-dark-main-color">
  
          <div className="flex justify-start">
            <button onClick={() => navigate(-1)}className="text-sm md:text-lg flex items-center gap-4 justify-center shadow-lg outline-none focus:ring-0 hover:ring-0 dark:text-white">
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          </div>
          
        <div className="flex flex-row flex-wrap gap-12 md:gap-4 lg:gap-24 items-center mt-12 sm:mt-20">
          {
            countryData && 'flags' in countryData &&
            <div className={styles.imagecontainer}>
              <img src={countryData.flags.png} />
            </div>
          }
  
  
          <div className="flex gap-4 flex-col dark:text-white flex-0 md:flex-1">
            {
              countryData && 'name' in countryData &&
              <h2 className="font-bold text-2xl mb-8">{countryData.name.official}</h2>
            }
            <div className="flex flex-col lg:flex-row flex-wrap gap-10 md:gap-14">
              <div className="flex flex-col gap-2">
                {
                  countryData && 'nativeName' in countryData && countryData.nativeName && countryData.nativeName.length > 0 &&
                  <p className="text-light-font-color font-semibold dark:dark:text-warmGray-300">Native Name: <span className="font-extralight">{countryData.nativeName[0].official}</span></p>
                }
                {
                  countryData && 'population' in countryData &&
                  <p className="text-light-font-color font-semibold dark:text-warmGray-300">Population: <span className="font-extralight">{countryData.population.toLocaleString()}</span></p>
                }
                {
                  countryData && 'region' in countryData &&
                  <p className="text-light-font-color font-semibold dark:text-warmGray-300">Region: <span className="font-extralight">{countryData.region}</span></p>
                }
                {
                  countryData && 'subregion' in countryData &&
                  <p className="text-light-font-color font-semibold dark:text-warmGray-300">Sub Region: <span className="font-extralight">{countryData.subregion}</span></p>
                }
                {
                  countryData && 'capital' in countryData &&
                  <p className="text-light-font-color font-semibold dark:text-warmGray-300">Capital: <span className="font-extralight">{countryData.capital[0]}</span></p>
                }
              </div>
  
              <div className="flex flex-col gap-2">
                {
                  countryData && 'currencies' in countryData &&
                  <p className="text-light-font-color font-semibold dark:text-warmGray-300">Currencies: <span className="font-extralight">{getCurrencies(countryData.currencies)}</span></p>
                }
                {
                  countryData && 'languages' in countryData &&
                  <p className="text-light-font-color font-semibold dark:text-warmGray-300">Languages: <span className="font-extralight">{getLanguages(countryData.languages)}</span></p>
                }
              </div>
            </div>
              {
                countryData && 'borders' in countryData &&
                <div className="flex flex-col sm:flex-row gap-2 mt-6">
                  <p className="dark:text-gray-200">Border Countries:</p>
                  <div className={`sm:flex-wrap sm:w-2/5 flex flex-wrap gap-2 cursor-pointer`}>{getBorderCountries(countryData.borders)}</div>
                </div>
              }
            </div>
  
        </div>
      </div>
  )
}

export default CountryDetailPage