// src/components/FixtureManagement.js
import React, { useState, useEffect } from 'react';
import { createFixture, getFixtures } from '../services/ApiService';
import './fixture.css';

const FixtureManagement = () => {
    const [opponent, setOpponent] = useState('');
    const [date, setDate] = useState('');
    const [fixtures, setFixtures] = useState([]);

    const fetchFixtures = async () => {
        const response = await getFixtures();
        if (response.success) {
            setFixtures(response.data);
        } else {
            alert('Error fetching fixtures');
        }
    };

    useEffect(() => {
        fetchFixtures();
    }, []);

    const handleCreateFixture = async (e) => {
        e.preventDefault();
        try {
            const response = await createFixture({ opponent, date });
            if (response.success) {
                setOpponent('');
                setDate('');
                fetchFixtures(); // Refresh the fixture list
            } else {
                alert('Error creating fixture');
            }
        } catch (error) {
            alert('Error creating fixture');
        }
    };

    return (
        <div className="fixture-management-container">
            <h3>Fixture Management</h3>
            <form onSubmit={handleCreateFixture}>
                <input
                    type="text"
                    value={opponent}
                    onChange={(e) => setOpponent(e.target.value)}
                    placeholder="Opponent Team"
                    required
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <button type="submit">Create Fixture</button>
            </form>
            <ul>
                {fixtures.map((fixture) => (
                    <li key={fixture._id}>
                        <span>{fixture.date}</span> vs {fixture.opponent}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FixtureManagement;
