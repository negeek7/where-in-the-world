import CountryCard from "./CountryCard"


// Interface is used to define structure of an object, 
// in this case for props. Here, we are saying that data is an Array of objects and those objects
// contain properties of Country interface
// Typescript :))
interface PropsInfo {
    data: Array<Country>
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
    capital: Array<String>
}

function Home({ data }: PropsInfo) {

    console.log(data, "DATAA")


    return (
        <div className="flex flex-row flex-wrap h-dvh p-14 gap-12 justify-center">
            {
                data.map((country, index) => (
                    <CountryCard key={index} country={country} />
                ))
            }
        </div>
    )
}

export default Home