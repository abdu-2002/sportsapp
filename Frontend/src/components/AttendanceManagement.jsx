// src/components/AttendanceManagement.js
import React, { useState, useEffect } from 'react';
import { addAttendance, getAttendanceByFixture } from '../services/ApiService';
import './attendance.css';

const AttendanceManagement = () => {
    const [fixtureId, setFixtureId] = useState('');
    const [playerId, setPlayerId] = useState('');
    const [status, setStatus] = useState('');
    const [attendanceList, setAttendanceList] = useState([]);

    const fetchAttendance = async () => {
        if (fixtureId) {
            const response = await getAttendanceByFixture(fixtureId);
            if (response.success) {
                setAttendanceList(response.data);
            } else {
                alert('Error fetching attendance');
            }
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, [fixtureId]);

    const handleAddAttendance = async (e) => {
        e.preventDefault();
        try {
            const response = await addAttendance({ fixtureId, playerId, status });
            if (response.success) {
                fetchAttendance(); // Refresh the attendance list
                setPlayerId('');
                setStatus('');
            } else {
                alert('Error adding attendance');
            }
        } catch (error) {
            alert('Error adding attendance');
        }
    };

    return (
        <div className="attendance-management-container">
            <h3>Attendance Management</h3>
            <form onSubmit={handleAddAttendance}>
                <input
                    type="text"
                    value={fixtureId}
                    onChange={(e) => setFixtureId(e.target.value)}
                    placeholder="Fixture ID"
                    required
                />
                <input
                    type="text"
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                    placeholder="Player ID"
                    required
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                >
                    <option value="" disabled>Status</option>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                </select>
                <button type="submit">Add Attendance</button>
            </form>
            <ul>
                {attendanceList.map((attendance) => (
                    <li key={attendance._id}>
                        Player ID: {attendance.playerId}, Status: {attendance.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AttendanceManagement;
