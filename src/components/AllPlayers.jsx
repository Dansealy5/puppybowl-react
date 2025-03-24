import { useState, useEffect } from "react"
import { fetchAllPlayers } from "../api"
import { useNavigate } from "react-router-dom"

const AllPlayers = () => {
    const [players, setPlayers] = useState([])
    const [error, setError] = useState(null)
    const [searchParam, setSearchParam] = useState("")

useEffect(() => {
    async function getAllPlayers() {
        try {
        const APIResponse = await fetchAllPlayers()
        console.log(APIResponse.data.players);
        if (APIResponse.success) {
            setPlayers(APIResponse.data.players)
        } else {
            setError(APIResponse.error.message)
        }
    } catch (err) {
        setError("Failed to fetch players")
    }
}
    getAllPlayers()
}, []);

const playersToDisplay = 
searchParam ? players.filter((player) => player.name.toLowerCase().includes(searchParam.toLowerCase())) : players;

const navigate = useNavigate()
const handleClick = () => {
    navigate(`/players/${id}`)
}

return (
    <>
        <div>
            <label>
                Search:{" "}
                <input type="text"
                placeholder="search"
                onChange={(e) => setSearchParam(e.target.value.toLowerCase())} /> 
            </label>
        </div>

        {playersToDisplay.map((player) => {
            return <h3 key={player.id}>{player.name}
            <button onClick={handleClick}>Details</button>
            </h3>
        })}
    </>
)
}
export default AllPlayers