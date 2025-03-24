import { useState, useEffect } from "react"
import { fetchPlayerById } from "../api"
import { useNavigate, useParams } from "react-router-dom"

const SinglePlayer = () => {
    const { id } = useParams()
    const [player, setPlayer] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getPlayerDetails() {
            try {
                const response = await fetchPlayerById(id)
                if (response.success && response.data) {
                    setPlayer(response.data)
                } else {
                    setError(response.error?.message || "Player not found")
                }
            } catch (err) {
                setError("Failed to get player details")
            } finally {
                setLoading(false)
            }
        }
        getPlayerDetails()
    }, [id]);

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div style={{color: "red"}}>Error: {error}</div>
    }
    if (!player) {
        return <div>No player details available</div>
    }

    return ( 
    <div>
      <h1>{player.name}</h1>
      <img src={player.imageUrl} alt={player.breed} />
      <p>Breed: {player.breed}</p>
      <p>Status: {player.status}</p>
      <p>Team: {player.teamId}</p>
    </div>
    );
}
 
export default SinglePlayer;