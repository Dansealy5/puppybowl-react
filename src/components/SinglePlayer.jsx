import { useState, useEffect } from "react"
import { fetchPlayerById } from "../api"
import { useNavigate, useParams } from "react-router-dom"

const SinglePlayer = () => {
    const { id } = useParams()
    const [player, setPlayer] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        console.log("Player ID:", id);
        
        async function getPlayerDetails() {
            try {
                const response = await fetchPlayerById(id)     

                console.log("API Response:", response)

                if (response.success && response.data) {
                    const foundPlayer = response.data.players ? response.data.players.find(player => player.id === parseInt(id)) : response.data
                    if (foundPlayer) {
                        setPlayer(foundPlayer)
                }   else {
                    setError("Player not found")
                }
                }   else {
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

    console.log("player state:", player);
    
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
      <h1>{player?.name}</h1>
      <img src={player?.imageUrl} alt={player?.name} />
      <p>Breed: {player?.breed}</p>
      <p>Status: {player?.status}</p>
      <p>Team: {player?.teamId ? player?.teamId : "Not assigned"}</p>
    </div>
    );
}

export default SinglePlayer;