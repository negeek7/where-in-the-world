import { Link } from 'react-router-dom'
import styles from '../../styles/countrycard.module.css'
import { Country } from './Home'

interface CountryProps {
    country: Country
}

function CountryCard({ country }: CountryProps) {

    return (
        <>
            <div className={`${styles.container} shadow-lg bg-black bg-opacity-0 cursor-pointer`}>
        <Link to={`country/${country.name.common}`}>
                <div className={styles.imagecontainer}>
                    <img src={country.flags.png} alt={country.flags.alt}/>
                </div>
                <div className={`${styles.bottomcontainer} dark:bg-dark-nav-color rounded-md`}>
                    <p className="font-semibold text-xl mt-2 mb-4 dark:text-stone-300-300 truncate" title={country.name.common}>{country.name.common}</p>
                    <div className="flex flex-col gap-2">
                        {
                            country.population &&
                            <div>
                                <span className="font-semibold dark:text-stone-300 text-sm sm:text-md">Population:</span> <span className=" dark:text-stone-100 text-sm sm:text-sm">{country.population.toLocaleString()}</span>
                            </div>
                        }
                        {
                            country.region &&
                            <div>
                                <span className="font-semibold dark:text-stone-300 text-sm sm:text-md">Region:</span> <span className=" dark:text-stone-100 text-sm sm:text-sm">{country.region}</span>
                            </div>
                        }
                        {
                            country.capital &&
                            <div>
                                <span className="font-semibold dark:text-stone-100 text-sm sm:text-md">Capital:</span> <span className=" dark:text-stone-300 text-sm sm:text-sm">{country.capital[0]}</span>
                            </div>
                        }
                    </div>
                </div>
        </Link>
            </div>
        </>
    )
}


export default CountryCard