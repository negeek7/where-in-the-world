export async function countryApiCaller(url: RequestInfo | URL, fields: {name: String, flags: String, region: String, capital: String, population: String}){

    const {name, flags, region, capital, population} = fields

    const response = await fetch(`${url}?fields=${name},${flags},${population},${region},${capital}`)
    
    const result = response.json()

    return result
}