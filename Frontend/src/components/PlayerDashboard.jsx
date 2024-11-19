// src/components/PlayerDashboard.js
import React from 'react';
import { getTeams, getFixtures } from '../services/ApiService';
import { useEffect, useState } from 'react';

const PlayerDashboard = () => {
    const [teams, setTeams] = useState([]);
    const [fixtures, setFixtures] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const teamData = await getTeams();
            const fixtureData = await getFixtures();
            setTeams(teamData.data);
            setFixtures(fixtureData.data);
        }
        fetchData();
    }, []);

    return (
        <div>
            <h2>Player Dashboard</h2>
            <h3>Teams</h3>
           
        <ul>{teams.map(team => <li key={team._id}>{team.name}</li>)}</ul>
            
            
            <h3>Fixtures</h3>
           
            <ul>{fixtures.map(fixture => <li key={fixture._id}>{fixture.date} - {fixture.opponent}</li>)}</ul>
        </div>
    );
};

export default PlayerDashboard;








