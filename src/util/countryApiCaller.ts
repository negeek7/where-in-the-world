export async function countryApiCaller(url: RequestInfo | URL, filter: { fields: Array<String> }) {

    const { fields } = filter

    const response = await fetch(`${url}?fields=${fields.join(',')}`)
    
    const result = await response.json()

    return result
}


export async function getCountriesByName(url: RequestInfo | URL, name: string){

    const response = await fetch(`${url}/name/${name}`)
    
    const result = await response.json()

    return result
}

export async function getCountriesByRegion(url: RequestInfo | URL, region: string){

    const response = await fetch(`${url}/region/${region}`)
    
    const result = await response.json()

    return result
}