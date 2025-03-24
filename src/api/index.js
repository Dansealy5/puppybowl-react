const cohortName = "2502-FTB-ET-WEB-FT";
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

export async function fetchAllPlayers() {
    try {
        const response = await fetch(`${APIURL}/players`)
        const result = await response.json()
        return result
    } catch (error) {
        console.error(error)
    }
}