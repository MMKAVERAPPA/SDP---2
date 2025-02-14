import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../header/PageHeader";
import axios from "axios";

function GameEdit() {
    const [game, setGame] = useState({ id: "", name: "", number_of_players: "", amount: "", description: "" });
    const params = useParams();
    const navigate = useNavigate();

    const txtBoxOnChange = (event) => {
        setGame({ ...game, [event.target.id]: event.target.value });
    };

    const readById = async () => {
        const baseUrl = "http://localhost:8080";
        try {
            const response = await axios.get(`${baseUrl}/games/${params.id}`);
            setGame(response.data);
        } catch (error) {
            alert("Server Error");
        }
    };

    const updateGame = async () => {
        const baseUrl = "http://localhost:8080";
        const formattedGame = {
            name: game.name,
            number_of_players: parseInt(game.number_of_players, 10),
            amount: parseFloat(game.amount),
            description: game.description,
        };

        try {
            const response = await axios.put(`${baseUrl}/games/${params.id}`, formattedGame);
            alert(response.data.message);
            navigate("/games/list");
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
            <h3 className="text-center">Edit Game</h3>
            <div className="container">
                <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label">Game Name:</label>
                    <input type="text" className="form-control" id="name" value={game.name} onChange={txtBoxOnChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="number_of_players" className="form-label">Number of Players:</label>
                    <input type="number" className="form-control" id="number_of_players" value={game.number_of_players} onChange={txtBoxOnChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="amount" className="form-label">Amount:</label>
                    <input type="number" step="0.01" className="form-control" id="amount" value={game.amount} onChange={txtBoxOnChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea className="form-control" id="description" value={game.description} onChange={txtBoxOnChange}></textarea>
                </div>
                <button className="btn btn-warning" onClick={updateGame}>Update Game</button>
                <a href="/games/list" className="btn btn-danger btn1" style={{ marginLeft: "10px" }}>Cancel</a>
            </div>
        </>
    );
}

export default GameEdit;
