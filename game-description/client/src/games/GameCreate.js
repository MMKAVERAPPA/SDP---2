import { useState } from "react";
import PageHeader from "../header/PageHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function GameCreate() {
    const [game, setGame] = useState({ name: "", number_of_players: "", amount: "", description: "" });
    const navigate = useNavigate();

    const txtBoxOnChange = (event) => {
        setGame({ ...game, [event.target.id]: event.target.value });
    };

    const createGame = async () => {
        const baseUrl = "http://localhost:8080";

        // Convert values to proper types
        const formattedGame = {
            name: game.name,
            number_of_players: parseInt(game.number_of_players, 10),
            amount: parseFloat(game.amount),
            description: game.description,
        };

        try {
            const response = await axios.post(`${baseUrl}/games`, formattedGame);
            alert("Game created successfully");
            navigate("/games/list");
        } catch (error) {
            alert("Server Error");
        }
    };

    return (
        <>
            <PageHeader />
            <h3 className="text-center">Add Game</h3>
            <div className="container">
                <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label">Game Name:</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter game name" value={game.name} onChange={txtBoxOnChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="number_of_players" className="form-label">Number of Players:</label>
                    <input type="number" className="form-control" id="number_of_players" placeholder="Enter number of players" value={game.number_of_players} onChange={txtBoxOnChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="amount" className="form-label">Amount:</label>
                    <input type="number" step="0.01" className="form-control" id="amount" placeholder="Enter amount" value={game.amount} onChange={txtBoxOnChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea className="form-control" id="description" placeholder="Enter game description" value={game.description} onChange={txtBoxOnChange}></textarea>
                </div>
                <button className="btn btn-primary" onClick={createGame}>Create Game</button>
                <a href="/games/list" className="btn btn-danger btn1" style={{ marginLeft: "10px" }}>Go Back</a>
            </div>
        </>
    );
}

export default GameCreate;
