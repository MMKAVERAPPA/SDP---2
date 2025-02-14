import { useEffect, useState } from "react";
import PageHeader from "../header/PageHeader";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./GameList.css"; // Import your custom CSS
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function GameList() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Load all games from the backend
  const readAllGames = async () => {
    try {
      const baseUrl = "http://localhost:8080";
      const response = await axios.get(`${baseUrl}/games`);
      setGames(response.data);
      setFilteredGames(response.data);
    } catch (error) {
      alert("Server Error");
    }
  };

  useEffect(() => {
    readAllGames();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredGames(games);
    } else {
      const filtered = games.filter((game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGames(filtered);
    }
  }, [searchTerm, games]);

  const deleteGame = async (id) => {
    if (!window.confirm("Are you sure you want to delete this game?")) {
      return;
    }
    const baseUrl = "http://localhost:8080";
    try {
      await axios.delete(`${baseUrl}/games/${id}`);
      alert("Game deleted successfully");
      readAllGames();
    } catch (error) {
      alert("Server Error");
    }
  };

  // Template for the actions column (View, Edit, Delete)
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <a href={`/games/view/${rowData.id}`} className="btn btn-success btn-sm">
          View
        </a>{" "}
        <a href={`/games/edit/${rowData.id}`} className="btn btn-warning btn-sm">
          Edit
        </a>{" "}
        <button className="btn btn-danger btn-sm" onClick={() => deleteGame(rowData.id)}>
          Delete
        </button>
      </>
    );
  };

  return (
    <>
      <PageHeader />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="text-center">List of Games</h3>
          <div className="input-group" style={{ width: "300px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <DataTable
          value={filteredGames}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
          className="custom-datatable"
        >
          <Column field="id" header="ID" style={{ width: "10%" }}></Column>
          <Column field="name" header="Name" style={{ width: "25%" }}></Column>
          <Column field="number_of_players" header="Players" style={{ width: "15%" }}></Column>
          <Column
            field="amount"
            header="Amount"
            body={(rowData) => rowData.amount.toFixed(2)}
            style={{ width: "15%" }}
          ></Column>
          <Column field="description" header="Description" style={{ width: "25%" }}></Column>
          <Column header="Actions" body={actionBodyTemplate} style={{ width: "10%" }}></Column>
        </DataTable>
      </div>
    </>
  );
}

export default GameList;
