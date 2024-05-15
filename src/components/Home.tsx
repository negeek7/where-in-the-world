import { useEffect, useState } from "react"
import CountryCard from "./CountryCard"
import FilterComponent from "./FilterComponent"
import SearchInput from "./SearchInput"
import Spinner from "./Spinner"




// Interface is used to define structure of an object, 
// in this case for props. Here, we are saying that data is an Array of objects and those objects
// contain properties of Country interface
// Typescript :))
interface PropsInfo {
    data: Array<Country>,
    handleSearchValue: Function,
    handleFilterSearch: Function,
    // searchFilteredData: Array<Country>,
    // dropdownFilterData: Array<Country>,
    filteredData: Array<Country>
}


// created interface for country with required properties 
export interface Country {
    name: {
        common: string
    },
    flags: {
        png: string,
        alt: string
    },
    population: number,
    region: string,
    capital: Array<String>,
}

function Home({ data, handleSearchValue, handleFilterSearch, filteredData }: PropsInfo) {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!filteredData.length && !data.length) {
            setIsLoading(true);
        } else {
            setIsLoading(true);
        }
    }, [filteredData, data]);
    
    const renderData = () => {
        if (filteredData && filteredData.length > 0) {
            return (
                filteredData.map((country, index) => (
                    <CountryCard key={index} country={country} />
                ))
            )
        } else if (data && data.length) {
            return (
                data.map((country, index) => (
                    <CountryCard key={index} country={country} />
                ))
            )
        }
    }


    return (
        <>
            <div className="flex flex-col gap-4 sm:flex-row justify-center sm:justify-between pt-6 sm:pt-10 pl-16 md:px-24">
                <SearchInput
                    placeholder={"Search for a country..."}
                    handleSearchValue={handleSearchValue}
                />
                <FilterComponent
                    regions={["Africa", "Americas", "Asia", "Europe", "Oceania"]}
                    handleFilterSearch={handleFilterSearch}
                />
            </div>
            {
                isLoading ? 
                <div className="flex justify-center items-center mt-40 sm:mt-60">
                    <Spinner />
                </div>
                :
            <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-dvh py-10 px-14 gap-12 justify-center">
                {renderData()}
            </div>

            }
        </>
    )
}

export default Home