export async function countryApiCaller(url: RequestInfo | URL, filter: { fields: Array<String>, limit: Number }) {

    const { fields, limit } = filter

    const response = await fetch(`${url}?fields=${fields.join(',')}`)
    
    const result = await response.json()
    const slicedResponse = result.slice(0,11) 

    return slicedResponse
}