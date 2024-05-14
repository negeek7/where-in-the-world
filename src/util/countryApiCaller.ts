export async function countryApiCaller(url: RequestInfo | URL, filter: { fields: Array<String> }) {

    const { fields } = filter

    const response = await fetch(`${url}?fields=${fields.join(',')}`)
    
    const result = await response.json()

    return result
}