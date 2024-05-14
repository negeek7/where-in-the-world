import CountryCard from "./CountryCard"
import FilterComponent from "./FilterComponent"
import SearchInput from "./SearchInput"



// Interface is used to define structure of an object, 
// in this case for props. Here, we are saying that data is an Array of objects and those objects
// contain properties of Country interface
// Typescript :))
interface PropsInfo {
    data: Array<Country>,
    handleSearchValue: Function,
    handleFilterSearch: Function,
    searchFilteredData: Array<Country>,
    dropdownFilterData: Array<Country>,
    // filteredData: Array<Country>
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

function Home({ data, handleSearchValue, searchFilteredData, handleFilterSearch, dropdownFilterData }: PropsInfo) {

    console.log(data, "DATAA")


    const renderData = () => {
        if (searchFilteredData && searchFilteredData.length > 0) {
            return (
                searchFilteredData.map((country, index) => (
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
        <div>
            <div className="flex flex-row flex-wrap gap-8 py-4 px-14 md:px-28 md:py-2 md:justify-between md:items-center mt-8">
                <SearchInput
                    placeholder={"Search for a country..."}
                    handleSearchValue={handleSearchValue}
                />
                <FilterComponent
                    regions={["Africa", "Americas", "Asia", "Europe", "Oceania"]}
                    handleFilterSearch={handleFilterSearch}
                />
            </div>
            <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-dvh py-10 px-14 gap-12 justify-center">
                {renderData()}
            </div>
        </div>
    )
}

export default Home