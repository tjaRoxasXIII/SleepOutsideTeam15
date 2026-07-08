
// this dunction just retrive data from any data base or json 
// it allows you to handled the data once you privide the url
export default async function fetchData(url) {
    const response = await fetch(url)
    
    if (!response.ok) {
        throw new Error("Could not load data");
    }

    return response.json()
}