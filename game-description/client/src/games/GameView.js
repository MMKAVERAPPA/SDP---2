import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../header/PageHeader";
import axios from "axios";

function GameView() {
    const [game, setGame] = useState({ id: "", name: "", number_of_players: 0, amount: 0.0, description: "", image_url: "" });
    const params = useParams();

    const readById = async () => {
        const baseUrl = "http://localhost:8080";
        try {
            const response = await axios.get(`${baseUrl}/games/${params.id}`);
            setGame(response.data);
        } catch (error) {
            alert("Server Error");
        }
    };

    useEffect(() => {
        readById();
    }, []);

    return (
        <>
            <PageHeader />
            <h3 className="text-center">View Game</h3>
            <div className="container">
                <div className="form-group mb-3">
                    <label className="form-label">Game Name:</label>
                    <div className="form-control">{game.name}</div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Number of Players:</label>
                    <div className="form-control">{game.number_of_players}</div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Amount:</label>
                    <div className="form-control">${game.amount.toFixed(2)}</div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Description:</label>
                    <div className="form-control">{game.description}</div>
                </div>
                <a href="/games/list" className="btn btn-danger" style={{ marginLeft: "10px" }}>Go Back</a>
                {game.image_url && (
                    <div className="form-group mb-3 text-center">
                        <label className="form-label">Game Cover:</label>
                        <div>
                            <img src={`http://localhost:8080/${game.image_url}`} alt="Game Cover" className="img-fluid rounded" style={{ maxWidth: "300px", height: "auto" }} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default GameView;
