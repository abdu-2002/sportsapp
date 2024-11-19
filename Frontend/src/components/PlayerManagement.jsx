// src/components/PlayerManagement.js
import React, { useState, useEffect } from 'react';
import { createPlayer, getTeams } from '../services/ApiService';
import './player.css';

const PlayerManagement = () => {
    const [playerName, setPlayerName] = useState('');
    const [playerPosition, setPlayerPosition] = useState('');
    const [playerAge, setPlayerAge] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');
    const [teams, setTeams] = useState([]);

    const fetchTeams = async () => {
        try {
            const response = await getTeams();
            if (response.success) {
                setTeams(response.data);
            } else {
                console.error('Error fetching teams:', response.message);
                alert('Failed to fetch teams.');
            }
        } catch (error) {
            console.error('Error fetching teams:', error);
            alert('Error connecting to the server.');
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const handleAddPlayer = async (e) => {
        e.preventDefault();
        if (!playerName || !playerPosition || !playerAge || !selectedTeam) {
            alert('Please fill out all fields.');
            return;
        }
        try {
            const result = await createPlayer(selectedTeam, {
                name: playerName,
                position: playerPosition,
                age: Number(playerAge),
            });
            if (result.success) {
                alert('Player added successfully!');
                setPlayerName('');
                setPlayerPosition('');
                setPlayerAge('');
                setSelectedTeam('');
            } else {
                alert(`Failed to add player: ${result.message}`);
            }
        } catch (error) {
            console.error('Error adding player:', error);
            alert('Error adding player.');
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">Player Management</h3>
            <form onSubmit={handleAddPlayer} className="form-card p-4">
                <div className="mb-3">
                    <label className="form-label">Select Team:</label>
                    <select
                        className="form-select"
                        onChange={(e) => setSelectedTeam(e.target.value)}
                        value={selectedTeam}
                    >
                        <option value="">Select Team</option>
                        {teams.map((team) => (
                            <option key={team._id} value={team._id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Player Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Enter player's name"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Player Position:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={playerPosition}
                        onChange={(e) => setPlayerPosition(e.target.value)}
                        placeholder="Enter player's position"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Player Age:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={playerAge}
                        onChange={(e) => setPlayerAge(e.target.value)}
                        placeholder="Enter player's age"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Add Player
                </button>
            </form>
        </div>
    );
};

export default PlayerManagement;
